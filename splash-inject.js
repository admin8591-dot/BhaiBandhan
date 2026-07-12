/* ============================================================
   splash-inject.js
   Injects the splash screen with branded welcome animation
   ============================================================ */

document.write(`
<div id="splash" style="position:fixed;inset:0;z-index:99999;background:#fdf6f0;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .5s ease">
  <div style="font-size:60px;animation:bounce 1s ease infinite">🪢</div>
  <div style="margin-top:14px;font-size:20px;font-weight:900;color:#8B1A1A">BhaiBandhan</div>
  <div id="welcome-text" style="margin-top:10px;font-size:16px;color:#8B1A1A;opacity:0;transition:opacity 0.5s ease;font-weight:500">🎉 Happy Shopping!</div>
  <div style="margin-top:16px;width:36px;height:36px;border:4px solid rgba(139,26,26,.15);border-top-color:#8B1A1A;border-radius:50%;animation:spin .8s linear infinite"></div>
</div>
<style>
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
</style>
`);

// Show welcome message after 0.5s
setTimeout(function() {
  const welcome = document.getElementById('welcome-text');
  if (welcome) welcome.style.opacity = '1';
}, 500);

// Hide welcome after 2s
setTimeout(function() {
  const welcome = document.getElementById('welcome-text');
  if (welcome) welcome.style.opacity = '0';
}, 2500);

let splashRemoved = false;

function hideSplash() {
  if (splashRemoved) return;
  splashRemoved = true;
  const s = document.getElementById('splash');
  if (!s) return;
  s.style.opacity = '0';
  setTimeout(function() {
    const el = document.getElementById('splash');
    if (el) el.remove();
  }, 500);
}

// Method 1: Hide on window load + minimum 800ms delay
window.addEventListener('load', function() {
  setTimeout(hideSplash, 800);
});

// Method 2: Emergency hide after 4 seconds (in case load event is slow)
setTimeout(hideSplash, 4000);

// Method 3: Detect when AppScript products are loaded
// Watch for changes in the DOM that indicate products are rendered
let productCheckInterval = setInterval(function() {
  // Look for common product container selectors
  const productSelectors = [
    '.product', '.product-item', '.product-card', 
    '[data-product]', '.item', '.card',
    '.rakhi-product', '.product-container'
  ];
  
  let productsFound = false;
  for (let selector of productSelectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      productsFound = true;
      break;
    }
  }
  
  // Also check if any img inside product containers are loaded
  if (productsFound) {
    const images = document.querySelectorAll('.product img, .product-item img, .product-card img, [data-product] img');
    let loadedImages = 0;
    images.forEach(img => {
      if (img.complete) loadedImages++;
    });
    
    // If we found products AND at least some images are loaded, hide splash
    if (images.length === 0 || loadedImages >= Math.min(images.length, 3)) {
      clearInterval(productCheckInterval);
      setTimeout(hideSplash, 300); // small buffer after products appear
    }
  }
}, 100);

// Clean up interval after 5 seconds to prevent memory leaks
setTimeout(function() {
  if (productCheckInterval) {
    clearInterval(productCheckInterval);
    productCheckInterval = null;
  }
}, 5000);
