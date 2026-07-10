/* =====================================================================
   🚀 Store Performance Booster (store-perf.js)
   ---------------------------------------------------------------------
   WHAT IT DOES:
   - Preconnects to external services (Google Sheets, ImgBB, CDNs)
   - Priority loading: Text → Layout → Images (no loading text visible)
   - Background image preloading using Image objects
   - Full image caching with Map() - no re-downloading
   - Blob cache for instant display
   - Parallel image preloading
   - Lazy loading for off-screen images
   - Smart loading order: Products → Text → Images → Backgrounds
   ===================================================================== */

(function() {

    'use strict';

    /* ============================================================
       📦 CONFIGURATION
       ============================================================ */
    const CONFIG = {
        // Domains to preconnect (faster connection setup)
        preconnectDomains: [
            'https://script.google.com',
            'https://i.ibb.co',
            'https://api.imgbb.com',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ],
        // Image preload settings
        maxParallelPreloads: 6,        // How many images to load at once
        preloadBatchSize: 3,            // Images to preload per batch
        cacheExpiry: 3600000,           // Cache expiry: 1 hour (ms)
        lazyThreshold: 200,             // Pixels before image enters viewport
    };

    /* ============================================================
       🗃️ CACHE SYSTEM
       ============================================================ */
    class ImageCache {
        constructor() {
            this.cache = new Map();
            this.blobCache = new Map();
            this.pending = new Map();
            this.stats = { hits: 0, misses: 0, total: 0 };
        }

        // Check if image is cached
        has(url) {
            return this.cache.has(url);
        }

        // Get from cache
        get(url) {
            this.stats.total++;
            if (this.cache.has(url)) {
                this.stats.hits++;
                return this.cache.get(url);
            }
            this.stats.misses++;
            return null;
        }

        // Store in cache
        set(url, data) {
            this.cache.set(url, {
                data: data,
                timestamp: Date.now()
            });
            // Clean old entries if cache gets too large
            if (this.cache.size > 100) {
                this.clean();
            }
        }

        // Store blob data
        setBlob(url, blob) {
            this.blobCache.set(url, {
                blob: blob,
                timestamp: Date.now()
            });
        }

        // Get blob
        getBlob(url) {
            if (this.blobCache.has(url)) {
                const entry = this.blobCache.get(url);
                if (Date.now() - entry.timestamp < CONFIG.cacheExpiry) {
                    return entry.blob;
                }
                this.blobCache.delete(url);
            }
            return null;
        }

        // Check if preload is pending
        isPending(url) {
            return this.pending.has(url);
        }

        // Set pending
        setPending(url) {
            this.pending.set(url, true);
        }

        // Clear pending
        clearPending(url) {
            this.pending.delete(url);
        }

        // Clean old cache entries
        clean() {
            const now = Date.now();
            const expiry = CONFIG.cacheExpiry;
            for (const [key, value] of this.cache) {
                if (now - value.timestamp > expiry) {
                    this.cache.delete(key);
                }
            }
            for (const [key, value] of this.blobCache) {
                if (now - value.timestamp > expiry) {
                    this.blobCache.delete(key);
                }
            }
        }

        // Get cache stats
        getStats() {
            return {
                ...this.stats,
                hitRate: this.stats.total > 0 ? 
                    Math.round((this.stats.hits / this.stats.total) * 100) : 0,
                cacheSize: this.cache.size,
                blobSize: this.blobCache.size
            };
        }

        // Clear all cache
        clear() {
            this.cache.clear();
            this.blobCache.clear();
            this.pending.clear();
            this.stats = { hits: 0, misses: 0, total: 0 };
        }
    }

    // Global cache instance
    const imageCache = new ImageCache();

    /* ============================================================
       🔌 PRECONNECT
       ============================================================ */
    function setupPreconnects() {
        CONFIG.preconnectDomains.forEach(domain => {
            // Preconnect
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);

            // DNS Prefetch (fallback)
            const dns = document.createElement('link');
            dns.rel = 'dns-prefetch';
            dns.href = domain;
            document.head.appendChild(dns);
        });
    }

    /* ============================================================
       🖼️ IMAGE PRELOADER
       ============================================================ */
    class ImagePreloader {
        constructor() {
            this.queue = [];
            this.active = 0;
            this.isPreloading = false;
            this.loadedCount = 0;
            this.totalCount = 0;
            this.onProgress = null;
            this.onComplete = null;
        }

        // Add images to preload queue
        addImages(urls) {
            // Filter: only preload if not cached and not pending
            const newUrls = urls.filter(url => {
                return url && 
                       !imageCache.has(url) && 
                       !imageCache.isPending(url);
            });
            
            if (newUrls.length) {
                this.queue.push(...newUrls);
                this.totalCount += newUrls.length;
            }
            return newUrls.length;
        }

        // Start preloading
        startPreload() {
            if (this.isPreloading || this.queue.length === 0) return;
            this.isPreloading = true;
            this.processQueue();
        }

        // Process queue with parallel loading
        processQueue() {
            if (this.queue.length === 0) {
                this.isPreloading = false;
                if (this.onComplete) this.onComplete(this.loadedCount);
                return;
            }

            // Load up to maxParallelPreloads simultaneously
            const toLoad = Math.min(
                CONFIG.maxParallelPreloads - this.active,
                this.queue.length
            );

            for (let i = 0; i < toLoad; i++) {
                const url = this.queue.shift();
                if (url) {
                    this.active++;
                    this.loadImage(url);
                }
            }

            // If we can't load more right now, check again later
            if (this.queue.length > 0 && this.active < CONFIG.maxParallelPreloads) {
                setTimeout(() => this.processQueue(), 100);
            }
        }

        // Load individual image
        loadImage(url) {
            if (!url) {
                this.active--;
                this.processQueue();
                return;
            }

            // Check cache first
            if (imageCache.has(url)) {
                this.active--;
                this.loadedCount++;
                this.processQueue();
                return;
            }

            imageCache.setPending(url);

            // Try loading with fetch for blob caching
            this.loadWithFetch(url);
        }

        // Load with fetch (for blob caching)
        loadWithFetch(url) {
            // If it's a data URL or already cached, handle directly
            if (url.startsWith('data:') || url.startsWith('blob:')) {
                imageCache.set(url, url);
                imageCache.clearPending(url);
                this.active--;
                this.loadedCount++;
                if (this.onProgress) this.onProgress(this.loadedCount, this.totalCount);
                this.processQueue();
                return;
            }

            // Try fetch for blob cache
            fetch(url, { mode: 'cors' })
                .then(response => {
                    if (!response.ok) throw new Error('Fetch failed');
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    imageCache.setBlob(url, blob);
                    imageCache.set(url, blobUrl);
                    imageCache.clearPending(url);
                    this.active--;
                    this.loadedCount++;
                    if (this.onProgress) this.onProgress(this.loadedCount, this.totalCount);
                    this.processQueue();
                })
                .catch(() => {
                    // Fallback: load with Image object
                    this.loadWithImage(url);
                });
        }

        // Load with Image object (fallback)
        loadWithImage(url) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const timeout = setTimeout(() => {
                img.src = '';
                imageCache.clearPending(url);
                this.active--;
                this.processQueue();
            }, 10000);

            img.onload = () => {
                clearTimeout(timeout);
                imageCache.set(url, img.src);
                imageCache.clearPending(url);
                this.active--;
                this.loadedCount++;
                if (this.onProgress) this.onProgress(this.loadedCount, this.totalCount);
                this.processQueue();
            };

            img.onerror = () => {
                clearTimeout(timeout);
                imageCache.clearPending(url);
                this.active--;
                this.processQueue();
            };

            img.src = url;
        }

        // Get progress
        getProgress() {
            return {
                loaded: this.loadedCount,
                total: this.totalCount,
                queue: this.queue.length,
                active: this.active,
                percent: this.totalCount > 0 ? 
                    Math.round((this.loadedCount / this.totalCount) * 100) : 0
            };
        }
    }

    /* ============================================================
       🔍 LAZY LOAD OBSERVER
       ============================================================ */
    class LazyLoader {
        constructor() {
            this.observed = new Set();
            this.observer = null;
            this.initObserver();
        }

        initObserver() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    (entries) => this.handleIntersections(entries),
                    {
                        rootMargin: CONFIG.lazyThreshold + 'px',
                        threshold: 0.01
                    }
                );
            }
        }

        // Observe images for lazy loading
        observeImages() {
            // Find all images that should be lazy loaded
            const images = document.querySelectorAll('img:not([loading="eager"])');
            images.forEach(img => {
                // Skip if already observed
                if (this.observed.has(img)) return;
                
                // Mark for lazy loading
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                
                // Store original src
                if (!img.dataset.originalSrc && img.src) {
                    img.dataset.originalSrc = img.src;
                    // Set placeholder
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
                    img.style.background = '#f0f0f0';
                }
                
                // Observe if not already visible
                if (this.observer) {
                    this.observer.observe(img);
                    this.observed.add(img);
                } else {
                    // Fallback: load all images
                    this.loadImage(img);
                }
            });
        }

        // Handle intersection events
        handleIntersections(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    if (this.observer) {
                        this.observer.unobserve(img);
                    }
                    this.observed.delete(img);
                }
            });
        }

        // Load a specific image
        loadImage(img) {
            const src = img.dataset.originalSrc || img.src;
            if (!src || src.includes('data:image/svg')) return;

            // Check cache first
            if (imageCache.has(src)) {
                const cached = imageCache.get(src);
                img.src = cached;
                img.loading = 'eager';
                return;
            }

            // Load with cache
            const preloader = new ImagePreloader();
            preloader.addImages([src]);
            preloader.onProgress = () => {
                if (imageCache.has(src)) {
                    img.src = imageCache.get(src);
                    img.loading = 'eager';
                }
            };
            preloader.startPreload();

            // Fallback: direct load
            if (!imageCache.isPending(src)) {
                img.src = src;
            }
        }

        // Force load all visible images
        loadVisibleImages() {
            document.querySelectorAll('img').forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    this.loadImage(img);
                }
            });
        }
    }

    /* ============================================================
       🎯 SMART LOAD ORDER
       ============================================================ */
    class SmartLoader {
        constructor() {
            this.preloader = new ImagePreloader();
            this.lazyLoader = new LazyLoader();
            this.loaded = false;
            this.setupPriorityLoading();
        }

        setupPriorityLoading() {
            // Step 1: Load critical content first
            this.loadCriticalContent();
            
            // Step 2: Load visible images
            setTimeout(() => {
                this.loadVisibleImages();
            }, 100);
            
            // Step 3: Preload remaining images
            setTimeout(() => {
                this.preloadRemainingImages();
            }, 500);
            
            // Step 4: Setup lazy loading for off-screen images
            setTimeout(() => {
                this.setupLazyLoading();
            }, 1000);
        }

        // Load critical content (text, layout)
        loadCriticalContent() {
            // Ensure text is visible
            document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, section, article')
                .forEach(el => {
                    if (el.style.display === 'none') {
                        el.style.display = '';
                    }
                    if (el.style.visibility === 'hidden') {
                        el.style.visibility = 'visible';
                    }
                    if (el.style.opacity === '0') {
                        el.style.opacity = '1';
                    }
                });
            
            // Remove loading classes
            document.querySelectorAll('.loading, .loading-placeholder')
                .forEach(el => {
                    el.classList.remove('loading', 'loading-placeholder');
                });
        }

        // Load visible images
        loadVisibleImages() {
            const images = document.querySelectorAll('img');
            const visible = [];
            
            images.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight + 200) {
                    visible.push(img.src);
                    this.lazyLoader.loadImage(img);
                }
            });
            
            // Preload visible images with priority
            if (visible.length) {
                this.preloader.addImages(visible);
                this.preloader.startPreload();
            }
        }

        // Preload remaining images in background
        preloadRemainingImages() {
            const images = document.querySelectorAll('img');
            const urls = [];
            
            images.forEach(img => {
                const src = img.dataset.originalSrc || img.src;
                if (src && !src.includes('data:image/svg')) {
                    urls.push(src);
                }
            });
            
            // Add background images
            document.querySelectorAll('[style*="background-image"]').forEach(el => {
                const style = el.style.backgroundImage;
                const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (match && match[1]) {
                    urls.push(match[1]);
                }
            });
            
            // Preload remaining in batches
            if (urls.length) {
                this.preloader.addImages(urls);
                this.preloader.onProgress = (loaded, total) => {
                    if (loaded === total) {
                        this.loaded = true;
                        console.log('✅ All images preloaded!');
                    }
                };
                this.preloader.startPreload();
            }
        }

        // Setup lazy loading
        setupLazyLoading() {
            this.lazyLoader.observeImages();
        }
    }

    /* ============================================================
       🌐 GLOBAL API
       ============================================================ */
    window.StorePerformance = {
        // Preload images manually
        preloadImages: function(urls, onProgress, onComplete) {
            const preloader = new ImagePreloader();
            preloader.addImages(urls);
            preloader.onProgress = onProgress || null;
            preloader.onComplete = onComplete || null;
            preloader.startPreload();
            return preloader;
        },

        // Get cache stats
        getCacheStats: function() {
            return imageCache.getStats();
        },

        // Clear cache
        clearCache: function() {
            imageCache.clear();
        },

        // Force load visible images
        loadVisible: function() {
            const loader = new SmartLoader();
            loader.loadVisibleImages();
        },

        // Check if image is cached
        isImageCached: function(url) {
            return imageCache.has(url);
        }
    };

    /* ============================================================
       ⚡ INIT
       ============================================================ */
    function init() {
        // Step 1: Setup preconnects
        setupPreconnects();

        // Step 2: Start smart loading
        const smartLoader = new SmartLoader();

        // Step 3: Handle dynamic content
        const observer = new MutationObserver(() => {
            smartLoader.setupLazyLoading();
        });
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });

        // Step 4: Load more images on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                smartLoader.loadVisibleImages();
            }, 200);
        }, { passive: true });

        console.log('🚀 Store Performance Booster initialized!');
        console.log('📊 Cache stats:', imageCache.getStats());
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
