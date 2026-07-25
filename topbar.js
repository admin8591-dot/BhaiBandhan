/* =====================================================================
   BhaiBandhan — Top Announcement Bar + Profile Header + Side Drawer
   (topbar.js)
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo, replacing your old topbar.js.
   2. In your index.html, keep the same line you already have:

        <script src="topbar.js"></script>

   3. Done — it injects everything itself:
        - a thin scrolling announcement bar at the very top
        - a bar below it with your circular profile photo, shop name,
          and a WhatsApp button (no search / no wishlist icons)
        - tapping the profile photo opens a side drawer with your
          photo, shop name, about text, and a "Message Us" WhatsApp row

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

  // ---- styles ----
  const css = `
    .bbtb-bar{position:sticky;top:0;left:0;right:0;z-index:99998;background:linear-gradient(90deg,#8B1A1A,#6b1414);display:flex;align-items:center;justify-content:space-between;padding:7px 12px;font-family:'Segoe UI',Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15);overflow:hidden}
    .bbtb-text-wrap{flex:1;overflow:hidden;white-space:nowrap;position:relative;height:16px}
    .bbtb-text{position:absolute;color:#fff;font-size:12px;font-weight:600;white-space:nowrap;animation:bbtb-scroll 17s linear infinite;padding-left:100%}
    @keyframes bbtb-scroll{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
    .bbtb-wa{flex-shrink:0;width:28px;height:28px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;text-decoration:none;margin-left:8px}
    .bbtb-wa svg{width:16px;height:16px;fill:#fff}

    .bbph-bar{position:sticky;top:26px;left:0;right:0;z-index:99997;background:linear-gradient(135deg,#8B1A1A,#6b1414);display:flex;align-items:center;gap:12px;padding:12px 16px;font-family:'Segoe UI',Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.12)}
    .bbph-avatar{width:42px;height:42px;border-radius:50%;border:2px solid rgba(255,255,255,.5);object-fit:cover;flex-shrink:0;cursor:pointer}
    .bbph-name{color:#fff;font-size:17px;font-weight:700;flex:1;font-family:Georgia,'Times New Roman',serif}
    .bbph-wa{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;text-decoration:none}
    .bbph-wa svg{width:19px;height:19px;fill:#fff}

    .bbdw-backdrop{position:fixed;inset:0;background:rgba(20,10,10,.5);z-index:99999;opacity:0;pointer-events:none;transition:opacity .3s ease}
    .bbdw-backdrop.open{opacity:1;pointer-events:auto}
    .bbdw-panel{position:fixed;top:0;left:0;bottom:0;width:86%;max-width:340px;background:#fff;z-index:100000;
      transform:translateX(-100%);transition:transform .3s ease;overflow-y:auto;box-shadow:6px 0 24px rgba(0,0,0,.2);
      padding:26px 22px 30px;font-family:'Segoe UI',Arial,sans-serif;text-align:center}
    .bbdw-panel.open{transform:translateX(0)}
    .bbdw-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;background:#f3e6e0;
      border:none;color:#8B1A1A;font-size:20px;line-height:1}
    .bbdw-avatar{width:96px;height:96px;border-radius:50%;border:3px solid #8B1A1A;object-fit:cover;margin:10px auto 16px}
    .bbdw-name{font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#1a0408;margin-bottom:12px}
    .bbdw-about{font-size:13.5px;color:#6b5a55;line-height:1.6;margin-bottom:20px}
    .bbdw-divider{border:none;border-top:1px solid #eee0da;margin:0 0 20px}
    .bbdw-msg{display:flex;align-items:center;gap:12px;text-decoration:none;color:#1a0408;font-weight:700;font-size:15px}
    .bbdw-msg .ic{width:44px;height:44px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .bbdw-msg .ic svg{width:22px;height:22px;fill:#fff}

    /* hide the site's older inline header so it isn't duplicated */
    .hd{display:none !important}
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const waIconSvg = `<svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m0 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.25-4.37c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.23.25-.87.86-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.79 4.32 3.82.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.19.21-.59.21-1.09.15-1.19-.07-.11-.23-.17-.48-.29-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8 1-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.57-1.4-.79-1.91-.2-.5-.42-.43-.57-.44-.15-.01-.31-.01-.48-.01Z"/></svg>`;

  // ---- marquee announcement bar ----
  const bar = document.createElement("div");
  bar.className = "bbtb-bar";
  bar.innerHTML = `
    <div class="bbtb-text-wrap"><div class="bbtb-text">${CONFIG.announcementText}</div></div>
    <a class="bbtb-wa" href="${waLink}" target="_blank">${waIconSvg}</a>
  `;

  // ---- profile header bar ----
  const profileBar = document.createElement("div");
  profileBar.className = "bbph-bar";
  profileBar.innerHTML = `
    <img class="bbph-avatar" id="bbphAvatar" src="${CONFIG.profileImageUrl}" alt="${CONFIG.shopName}">
    <div class="bbph-name">${CONFIG.shopName}</div>
    <a class="bbph-wa" href="${waLink}" target="_blank">${waIconSvg}</a>
  `;

  // ---- side drawer ----
  const backdrop = document.createElement("div");
  backdrop.className = "bbdw-backdrop";
  backdrop.id = "bbdwBackdrop";

  const panel = document.createElement("div");
  panel.className = "bbdw-panel";
  panel.id = "bbdwPanel";
  panel.innerHTML = `
    <button class="bbdw-close" id="bbdwClose">&times;</button>
    <img class="bbdw-avatar" src="${CONFIG.profileImageUrl}" alt="${CONFIG.shopName}">
    <div class="bbdw-name">${CONFIG.shopName}</div>
    <div class="bbdw-about">${CONFIG.aboutText}</div>
    <hr class="bbdw-divider">
    <a class="bbdw-msg" href="${waLink}" target="_blank">
      <span class="ic">${waIconSvg}</span> Message Us
    </a>
  `;

  document.body.insertBefore(profileBar, document.body.firstChild);
  document.body.insertBefore(bar, document.body.firstChild);
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  function openDrawer() {
    backdrop.classList.add("open");
    panel.classList.add("open");
  }
  function closeDrawer() {
    backdrop.classList.remove("open");
    panel.classList.remove("open");
  }

  document.getElementById("bbphAvatar").addEventListener("click", openDrawer);
  document.getElementById("bbdwClose").addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

})();
