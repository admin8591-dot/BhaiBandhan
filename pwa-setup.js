(function () {
  const CONFIG = {
    themeColor: "#B5592F",
    iconUrl: "/icon-512.png"
  };

  const manifestLink = document.createElement("link");
  manifestLink.rel = "manifest";
  manifestLink.href = "/manifest.json";
  document.head.appendChild(manifestLink);

  const themeMeta = document.createElement("meta");
  themeMeta.name = "theme-color";
  themeMeta.content = CONFIG.themeColor;
  document.head.appendChild(themeMeta);

  const appleIcon = document.createElement("link");
  appleIcon.rel = "apple-touch-icon";
  appleIcon.href = CONFIG.iconUrl;
  document.head.appendChild(appleIcon);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
})();

