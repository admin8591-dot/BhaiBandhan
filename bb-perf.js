/* =====================================================================
   BhaiBandhan — Performance Boost (bb-perf.js)
   Preconnect hints + automatic lazy-loading for all images
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo (same repo as your site).
   2. In index.html, add this line INSIDE the <head> section, as
      close to the TOP as possible (right after <meta charset="UTF-8">
      is ideal) — this matters for the preconnect part to work well:

        <script src="bb-perf.js"></script>

   3. Done. No other file needs to change.

   WHAT IT DOES:
   - Preconnect: tells the browser to start connecting to Google
     Apps Script and ImgBB servers immediately, before it even needs
     to fetch anything from them — saves connection setup time.
   - Lazy-load: automatically adds loading="lazy" to every image on
     your page (product photos, gallery images, banners) so the
     browser only downloads images as they scroll into view, instead
     of all at once on page load.
   ===================================================================== */

(function(){

  /* ---------- PRECONNECT ---------- */
  const preconnectDomains = [
    'https://script.google.com',
    'https://i.ibb.co'
  ];
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });

  /* ---------- AUTO LAZY-LOAD ---------- */
  function applyLazy(img){
    if(!img.hasAttribute('loading')){
      img.setAttribute('loading', 'lazy');
    }
  }

  // Apply to any images already on the page
  document.querySelectorAll('img').forEach(applyLazy);

  // Apply to any images added later (product cards, gallery, banners
  // that load dynamically from your Sheet after the page starts)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if(node.nodeType !== 1) return; // only element nodes
        if(node.tagName === 'IMG') applyLazy(node);
        node.querySelectorAll && node.querySelectorAll('img').forEach(applyLazy);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

})();
