// ===== Force Cache Clear — BhaiBandhan Store =====
// Just add: <script src="cache-buster.js"></script> as the VERY
// FIRST script in <head> or right after <body> opens (before your
// other scripts). No other edits needed.
//
// What it does (runs once per visitor, automatically):
// 1. Unregisters any old Service Worker that may be serving stale
//    cached pages.
// 2. Deletes all old browser caches created by that Service Worker.
// 3. Reloads the page ONE time so the visitor sees the latest version.
//
// After this fix has been live for a few days and everyone is on
// the latest version, you can safely remove this script.

(function () {
  const ALREADY_BUSTED_KEY = 'bbf_cache_busted_v1';

  // Only do this once per browser, not on every single page load
  if (sessionStorage.getItem(ALREADY_BUSTED_KEY)) return;

  async function bustCache() {
    let didSomething = false;

    // 1. Unregister old service workers
    if ('serviceWorker' in navigator) {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const reg of regs) {
          await reg.unregister();
          didSomething = true;
        }
      } catch (e) {}
    }

    // 2. Delete old caches
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        for (const key of keys) {
          await caches.delete(key);
          didSomething = true;
        }
      } catch (e) {}
    }

    sessionStorage.setItem(ALREADY_BUSTED_KEY, '1');

    // 3. Reload once so the visitor gets the fresh version
    if (didSomething) {
      window.location.reload(true);
    }
  }

  bustCache();
})();

