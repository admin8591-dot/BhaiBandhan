/* =====================================================================
   BhaiBandhan — Top Announcement Bar (bb-topbar.js)
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo (same repo as your site).
   2. In your index.html, add ONE line right before the closing
      </body> tag (same as bb-footer.js — position doesn't matter,
      it inserts itself at the very top of the page automatically):

        <script src="bb-topbar.js"></script>

   3. Done — a thin bar appears at the top with your text + a
      WhatsApp icon on the right that opens a prefilled chat.

   To change the text, number, or message, edit CONFIG below.
   ===================================================================== */

(function(){

  const CONFIG = {
    text: "🎉 राखी विशेष ऑफर — ₹299+ पर Free Delivery!",
    whatsappNumber: "917608053740",
    prefilledMessage: "Hi BhaiBandhan! I have a question about your rakhis 🪢"
  };

  const css = `
    .bbtb-bar{position:sticky;top:0;left:0;right:0;z-index:99998;background:linear-gradient(90deg,#8B1A1A,#6b1414);display:flex;align-items:center;justify-content:space-between;padding:7px 12px;font-family:'Segoe UI',Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15)}
    .bbtb-text{color:#fff;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;padding-right:10px}
    .bbtb-wa{flex-shrink:0;width:28px;height:28px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;text-decoration:none}
    .bbtb-wa svg{width:16px;height:16px;fill:#fff}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.prefilledMessage)}`;

  const bar = document.createElement('div');
  bar.className = 'bbtb-bar';
  bar.innerHTML = `
    <div class="bbtb-text">${CONFIG.text}</div>
    <a class="bbtb-wa" href="${waLink}" target="_blank">
      <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m0 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.25-4.37c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.23.25-.87.86-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.79 4.32 3.82.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.19.21-.59.21-1.09.15-1.19-.07-.11-.23-.17-.48-.29-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8 1-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.57-1.4-.79-1.91-.2-.5-.42-.43-.57-.44-.15-.01-.31-.01-.48-.01Z"/></svg>
    </a>
  `;

  document.body.insertBefore(bar, document.body.firstChild);

})();

