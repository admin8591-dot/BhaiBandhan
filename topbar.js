/* =====================================================================
   BhaiBandhan — Top Announcement Bar + Profile Header + Side Drawer
   (topbar.js) — v2.3 Premium Dual Theme
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo, replacing your old topbar.js.
   2. Keep the same line already in index.html:
        <script src="topbar.js"></script>
   3. Done.

   To change any text, number, or image, edit CONFIG below.
   ===================================================================== */

(function () {

  const CONFIG = {
    // --- marquee bar ---
    announcementText: "🎉 राखी विशेष ऑफर — ₹299+ पर Free Delivery!",
    whatsappNumber: "917608053740",
    prefilledMessage: "Hi BhaiBandhan! I have a question about your rakhis 🪢",

    // --- profile bar / drawer ---
    shopName: "BhaiBandhan",
    profileImageUrl: "/launchericon-512x512.png",
    aboutText: "BhaiBandhan started with a simple idea: rakhis should feel personal, not mass-produced. Every rakhi in our collection is handmade with care, straight from the heart — for the bond you share with your brother."
  };

  const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.prefilledMessage)}`;

  // ---- Update theme colors ----
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.content = "#7A1F1F";
  } else {
    const meta = document.createElement('meta');
    meta.name = "theme-color";
    meta.content = "#7A1F1F";
    document.head.appendChild(meta);
  }

  // ---- styles ----
  const css = `
    /* single sticky wrapper holding BOTH bars */
    .bbtb-wrapper{position:sticky;top:0;left:0;right:0;z-index:99998}

    /* bar 1: LIGHT THEME - Warm cream with subtle shadow */
    .bbtb-bar{background:#F8F1E8;padding:3px 12px;font-family:'Segoe UI',Arial,sans-serif;
      overflow:hidden;border-bottom:1.5px solid #D4AF37;
      box-shadow:0 2px 8px rgba(212,175,55,0.15)}
    .bbtb-text-wrap{overflow:hidden;white-space:nowrap;position:relative;height:12px}
    .bbtb-text{position:absolute;color:#7A1F1F;font-size:9.5px;font-weight:700;
      white-space:nowrap;animation:bbtb-scroll 17s linear infinite;padding-left:100%;
      letter-spacing:0.3px}
    @keyframes bbtb-scroll{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}

    /* bar 2: DARK THEME - Deep maroon with premium gold accents */
    .bbph-bar{background:linear-gradient(135deg,#7A1F1F,#5a1414);
      display:flex;align-items:center;gap:10px;padding:5px 14px;
      font-family:'Playfair Display','Cinzel',Georgia,'Times New Roman',serif;
      border-bottom:2.5px solid #D4AF37;
      box-shadow:0 4px 16px rgba(122,31,31,0.35),inset 0 1px 0 rgba(212,175,55,0.1)}
    
    /* Logo - White background, gold border, shadow on dark bg */
    .bbph-avatar{width:38px;height:38px;border-radius:50%;border:2.5px solid #D4AF37;
      background:#ffffff;object-fit:cover;flex-shrink:0;cursor:pointer;
      box-shadow:0 0 0 1px rgba(212,175,55,0.3),0 3px 12px rgba(0,0,0,0.3);
      transition:transform 0.2s ease}
    .bbph-avatar:hover{transform:scale(1.05)}
    
    /* Shop name in gold/cream on dark background */
    .bbph-name{color:#F8F1E8;font-size:17px;font-weight:700;flex:1;
      font-family:'Playfair Display','Cinzel',Georgia,'Times New Roman',serif;
      letter-spacing:0.5px;text-shadow:0 2px 8px rgba(0,0,0,0.3)}
    
    /* WhatsApp on dark theme - Gold accent ring */
    .bbph-wa{flex-shrink:0;width:30px;height:30px;border-radius:50%;
      background:#25D366;display:flex;align-items:center;justify-content:center;
      text-decoration:none;box-shadow:0 0 0 2px #D4AF37,0 3px 10px rgba(0,0,0,0.3);
      transition:all 0.2s ease}
    .bbph-wa:hover{transform:scale(1.08);box-shadow:0 0 0 3px #D4AF37,0 4px 14px rgba(0,0,0,0.4)}
    .bbph-wa svg{width:16px;height:16px;fill:#fff}

    /* Side Drawer - Premium dark theme matching */
    .bbdw-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;
      opacity:0;pointer-events:none;transition:opacity .3s ease}
    .bbdw-backdrop.open{opacity:1;pointer-events:auto}
    
    .bbdw-panel{position:fixed;top:0;left:0;bottom:0;width:86%;max-width:340px;
      background:linear-gradient(180deg,#7A1F1F,#4a1212);z-index:100000;
      transform:translateX(-100%);transition:transform .3s ease;overflow-y:auto;
      box-shadow:6px 0 30px rgba(0,0,0,0.5);
      padding:26px 22px 30px;font-family:'Playfair Display','Cinzel','Segoe UI',Arial,sans-serif;
      text-align:center;border-right:2px solid #D4AF37}
    .bbdw-panel.open{transform:translateX(0)}
    
    .bbdw-close{position:absolute;top:14px;right:14px;width:34px;height:34px;
      border-radius:50%;background:#D4AF37;border:2px solid #F8F1E8;
      color:#7A1F1F;font-size:20px;line-height:1;cursor:pointer;
      box-shadow:0 2px 10px rgba(0,0,0,0.3);transition:transform 0.2s ease}
    .bbdw-close:hover{transform:rotate(90deg)}
    
    .bbdw-avatar{width:96px;height:96px;border-radius:50%;border:3.5px solid #D4AF37;
      background:#ffffff;object-fit:cover;margin:10px auto 16px;
      box-shadow:0 0 0 2px rgba(212,175,55,0.3),0 6px 20px rgba(0,0,0,0.4)}
    
    .bbdw-name{font-family:'Playfair Display','Cinzel',Georgia,'Times New Roman',serif;
      font-size:24px;font-weight:700;color:#F8F1E8;margin-bottom:12px;
      letter-spacing:0.5px;text-shadow:0 2px 8px rgba(0,0,0,0.3)}
    
    .bbdw-about{font-size:13.5px;color:#e8ddd0;line-height:1.7;margin-bottom:20px;
      font-family:'Segoe UI',Arial,sans-serif;opacity:0.9}
    
    .bbdw-divider{border:none;border-top:2px solid #D4AF37;margin:0 0 20px;
      width:60px;margin-left:auto;margin-right:auto;opacity:0.8}
    
    .bbdw-msg{display:flex;align-items:center;gap:12px;text-decoration:none;
      color:#F8F1E8;font-weight:700;font-size:15px;
      font-family:'Segoe UI',Arial,sans-serif;
      padding:10px 16px;border-radius:12px;
      background:rgba(255,255,255,0.05);border:1.5px solid rgba(212,175,55,0.3);
      transition:all 0.2s ease}
    .bbdw-msg:hover{background:rgba(212,175,55,0.1);border-color:#D4AF37}
    
    .bbdw-msg .ic{width:44px;height:44px;border-radius:50%;background:#25D366;
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
      box-shadow:0 2px 10px rgba(37,211,102,0.3)}
    .bbdw-msg .ic svg{width:22px;height:22px;fill:#fff}
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const waIconSvg = `<svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m0 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.25-4.37c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.23.25-.87.86-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.79 4.32 3.82.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.19.21-.59.21-1.09.15-1.19-.07-.11-.23-.17-.48-.29-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8 1-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.57-1.4-.79-1.91-.2-.5-.42-.43-.57-.44-.15-.01-.31-.01-.48-.01Z"/></svg>`;

  // ---- both bars, in one sticky wrapper ----
  const wrapper = document.createElement("div");
  wrapper.className = "bbtb-wrapper";
  wrapper.innerHTML = `
    <div class="bbtb-bar">
      <div class="bbtb-text-wrap"><div class="bbtb-text">${CONFIG.announcementText}</div></div>
    </div>
    <div class="bbph-bar">
      <img class="bbph-avatar" id="bbphAvatar" src="${CONFIG.profileImageUrl}" alt="${CONFIG.shopName}">
      <div class="bbph-name">${CONFIG.shopName}</div>
      <a class="bbph-wa" href="${waLink}" target="_blank" aria-label="WhatsApp">${waIconSvg}</a>
    </div>
  `;
  document.body.insertBefore(wrapper, document.body.firstChild);

  // ---- side drawer ----
  const backdrop = document.createElement("div");
  backdrop.className = "bbdw-backdrop";
  backdrop.id = "bbdwBackdrop";

  const panel = document.createElement("div");
  panel.className = "bbdw-panel";
  panel.id = "bbdwPanel";
  panel.innerHTML = `
    <button class="bbdw-close" id="bbdwClose" aria-label="Close drawer">&times;</button>
    <img class="bbdw-avatar" src="${CONFIG.profileImageUrl}" alt="${CONFIG.shopName}">
    <div class="bbdw-name">${CONFIG.shopName}</div>
    <div class="bbdw-about">${CONFIG.aboutText}</div>
    <hr class="bbdw-divider">
    <a class="bbdw-msg" href="${waLink}" target="_blank">
      <span class="ic">${waIconSvg}</span> Message Us
    </a>
  `;
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  function openDrawer() {
    backdrop.classList.add("open");
    panel.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    backdrop.classList.remove("open");
    panel.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.getElementById("bbphAvatar").addEventListener("click", openDrawer);
  document.getElementById("bbdwClose").addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  // ---- Update manifest.json dynamically (if needed) ----
  try {
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      fetch(manifestLink.href)
        .then(res => res.json())
        .then(manifest => {
          manifest.theme_color = "#7A1F1F";
          manifest.background_color = "#F8F1E8";
          console.log("✅ Manifest theme colors updated in memory");
        })
        .catch(() => {});
    }
  } catch (e) {}

})();
