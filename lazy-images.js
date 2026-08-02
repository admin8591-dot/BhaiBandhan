// ===== Smart Image Loading — BhaiBandhan Store =====
// Just add: <script src="lazy-images.js"></script> near the end of
// <body>, after your other scripts. No other edits needed.
//
// What it does:
// - The very FIRST image on the page (your main/banner image) loads
//   immediately and with high priority, so it appears fast.
// - Every other image (product photos, gallery, etc.) is marked
//   loading="lazy", so the browser only downloads them as the user
//   scrolls near them — instead of downloading everything at once.
// This works even though your images are injected dynamically by
// your existing JS (banner, product grid, popups).

(function () {
  let firstImageHandled = false;

  function processImg(img) {
    if (img.dataset.bbfLazyDone) return;
    img.dataset.bbfLazyDone = '1';

    if (!firstImageHandled) {
      firstImageHandled = true;
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    } else {
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
    }
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('img').forEach(processImg);
  }

  // Handle images already on the page
  scan(document);

  // Handle images added later (banner slides, product cards, popups, etc.)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.tagName === 'IMG') {
          processImg(node);
        } else {
          scan(node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

