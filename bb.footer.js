/* =====================================================================
   BhaiBandhan — Premium Footer Widget (bb-footer.js)
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo (same repo as your site,
      e.g. alongside index.html).
   2. In your already-deployed index.html, add ONE line right before
      the closing </body> tag:

        <script src="bb-footer.js"></script>

      (or, if hosted on GitHub Pages, the relative path works directly
      since it's in the same repo — e.g. <script src="/bb-footer.js">)

   3. That's it — this script injects the "making of" gallery strip,
      the BhaiBandhan footer, and the Privacy/Terms/Return/Contact
      popups at the bottom of the page automatically. Nothing in your
      existing index.html needs to change.

   NOTE: This footer's text is static (hardcoded here), not pulled from
   the admin panel's Site Text sheet — matches your request to keep
   this section looking premium rather than plain edit-box text. If you
   want to change any wording, edit the CONTENT object below directly.
   ===================================================================== */

(function(){

  /* ---------- EDIT THIS CONTENT DIRECTLY IF NEEDED ---------- */
  const CONTENT = {
    galleryImages: [
      "https://i.ibb.co/Ps134VsP/20250727-222035-1.jpg",
      "https://i.ibb.co/q3YrNDyy/20250728-003737-1.jpg",
      "https://i.ibb.co/G4cjxKWd/20250728-005407-1.jpg",
      "https://i.ibb.co/cXRhVb4W/AISelect-20260611-121826-Gallery.jpg",
      "https://i.ibb.co/sdLWs84J/20250728-005458-1.jpg",
      "https://i.ibb.co/nsW2tXrv/20250728-235659-1.jpg"
    ],
    phone: "+91 76080 53740",
    location: "Balasore, Odisha, India",
    deliveryLine: "📦 Free delivery on orders above ₹299 · Delivery in 5–7 days",

    privacy: `
      <p><b>What we collect:</b> Name, phone number, delivery address, and order details — only what's needed to process and deliver your order.</p>
      <p><b>How we use it:</b> Solely for order fulfilment, delivery coordination, and customer support over WhatsApp. We never sell or share your data with third parties.</p>
      <p><b>Storage:</b> Your order details are stored securely and retained only as long as needed for order history and support.</p>
    `,

    terms: `
      <div class="bbf-tag">Last updated: June 2025</div>
      <p>By placing an order on BhaiBandhan, you agree to the following terms.</p>
      <h4>Pricing</h4>
      <p>All prices are in Indian Rupees (₹) inclusive of applicable taxes. Prices may change without prior notice.</p>
      <h4>Orders</h4>
      <ul>
        <li>Orders cannot be cancelled after 12 hours of confirmation.</li>
        <li>Product colors may slightly vary from images due to screen differences.</li>
        <li>Delivery takes 5–10 working days across India.</li>
      </ul>
      <h4>Handmade Nature</h4>
      <p>All our rakhis are handcrafted individually. Minor variations in size, color, or finish are part of the handmade character and are not defects.</p>
      <h4>Liability</h4>
      <p>We are not responsible for delivery delays caused by courier partners or unforeseen events.</p>
    `,

    returns: `
      <p><b>Replacement window:</b> Damaged, defective, or wrong items can be replaced within 3 days of delivery.</p>
      <p><b>How to claim:</b> Message us on WhatsApp with your order ID and a clear photo of the item received.</p>
      <p><b>Not eligible:</b> Minor handmade variations in color/size are not considered defects. Change-of-mind returns are not accepted since each rakhi is made to order.</p>
    `,

    contact: `
      <p>📞 <b>Phone / WhatsApp:</b> +91 76080 53740</p>
      <p>📍 <b>Location:</b> Balasore, Odisha, India</p>
      <p>We usually respond within a few hours. For fastest support, message us directly on WhatsApp with your order ID.</p>
    `
  };

  /* ---------- STYLES (scoped with bbf- prefix to avoid clashing) ---------- */
  const css = `
    .bbf-wrap{background:#fdf6f0;padding:24px 16px 10px;text-align:center;font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto}
    .bbf-badge{display:inline-block;background:#fff;border:1px solid rgba(139,26,26,.2);color:#8B1A1A;font-size:12px;font-weight:700;padding:6px 16px;border-radius:20px;margin-bottom:14px}
    .bbf-title{font-size:20px;font-weight:900;color:#8B1A1A;margin-bottom:8px}
    .bbf-sub{font-size:13px;color:#666;line-height:1.6;margin-bottom:18px}
    .bbf-gal{overflow:hidden;border-radius:14px;margin-bottom:10px}
    .bbf-gal-track{display:flex;gap:8px;transition:transform .5s cubic-bezier(.25,.8,.25,1)}
    .bbf-gal-track img{width:100%;flex-shrink:0;height:220px;object-fit:cover;border-radius:14px;scroll-snap-align:start}
    .bbf-dots{display:flex;justify-content:center;gap:6px;margin:10px 0 22px}
    .bbf-dot{width:7px;height:7px;border-radius:50%;background:rgba(139,26,26,.25);cursor:pointer;transition:all .2s}
    .bbf-dot.on{background:#8B1A1A;width:20px;border-radius:4px}
    .bbf-logo{font-size:22px;font-weight:900;color:#8B1A1A}
    .bbf-tagline{font-size:12.5px;color:#888;margin:4px 0 18px}
    .bbf-links{display:flex;justify-content:center;flex-wrap:wrap;gap:0;margin-bottom:10px}
    .bbf-links a{font-size:13px;color:#8B1A1A;font-weight:600;text-decoration:underline;cursor:pointer;padding:0 12px;border-right:1px solid rgba(139,26,26,.2)}
    .bbf-links a:last-child{border-right:none}
    .bbf-contact-row{margin-bottom:18px}
    .bbf-contact-row a{font-size:13px;color:#8B1A1A;font-weight:600;text-decoration:underline;cursor:pointer}
    .bbf-infobar{background:rgba(139,26,26,.06);border-radius:12px;padding:12px 16px;font-size:12.5px;color:#555;line-height:1.9;margin-bottom:16px}
    .bbf-copy{font-size:11px;color:#bbb;border-top:1px solid rgba(0,0,0,.06);padding:14px 0 20px}

    .bbf-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99996}
    .bbf-ov.on{display:block}
    .bbf-pop{display:none;position:fixed;bottom:0;left:0;right:0;max-width:600px;margin:0 auto;background:#fffaf5;border-radius:20px 20px 0 0;z-index:99997;max-height:80vh;overflow-y:auto;transform:translateY(100%);transition:transform .35s cubic-bezier(.34,1.2,.64,1)}
    .bbf-pop.on{display:block;transform:translateY(0)}
    .bbf-pop-hdr{display:flex;justify-content:space-between;align-items:center;padding:18px 18px 14px;border-bottom:1px solid rgba(0,0,0,.08)}
    .bbf-pop-hdr h3{color:#8B1A1A;font-size:17px}
    .bbf-pop-cls{width:30px;height:30px;background:rgba(139,26,26,.1);border:none;border-radius:50%;color:#8B1A1A;font-size:14px;cursor:pointer}
    .bbf-pop-body{padding:18px}
    .bbf-pop-body p{font-size:13px;color:#444;line-height:1.7;margin-bottom:10px}
    .bbf-pop-body h4{font-size:13.5px;color:#8B1A1A;margin:14px 0 6px}
    .bbf-pop-body ul{padding-left:18px;margin-bottom:10px}
    .bbf-pop-body li{font-size:13px;color:#444;line-height:1.7;margin-bottom:4px}
    .bbf-tag{display:inline-block;background:rgba(139,26,26,.08);border:1px solid rgba(139,26,26,.2);color:#8B1A1A;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:12px}
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------- HTML ---------- */
  const galleryImgsHtml = CONTENT.galleryImages.map(src => `<img src="${src}">`).join('');
  const dotsHtml = CONTENT.galleryImages.map((_,i)=>`<div class="bbf-dot${i===0?' on':''}" data-i="${i}"></div>`).join('');

  const html = `
    <div class="bbf-wrap">
      <div class="bbf-badge">✨ Pure Handmade — Zero Machine</div>
      <div class="bbf-title">🎀 बनती है हाथों से, दिल से</div>
      <div class="bbf-sub">Fresh, Handmade और Unique।<br>सिर्फ आपके भाई के लिए। 💛</div>

      <div class="bbf-gal"><div class="bbf-gal-track" id="bbfTrack">${galleryImgsHtml}</div></div>
      <div class="bbf-dots" id="bbfDots">${dotsHtml}</div>

      <div class="bbf-logo">🧿 BhaiBandhan</div>
      <div class="bbf-tagline">हर राखी में छुपा है भाई का प्यार</div>

      <div class="bbf-links">
        <a data-modal="privacy">Privacy Policy</a>
        <a data-modal="terms">Terms &amp; Conditions</a>
        <a data-modal="returns">Return Policy</a>
      </div>
      <div class="bbf-contact-row"><a data-modal="contact">Contact Us</a></div>

      <div class="bbf-infobar">
        ${CONTENT.deliveryLine}<br>
        📍 ${CONTENT.location} &nbsp;·&nbsp; 📞 ${CONTENT.phone}
      </div>

      <div class="bbf-copy">© ${new Date().getFullYear()} BhaiBandhan. All rights reserved. Made with ❤️ in India</div>
    </div>

    <div class="bbf-ov" id="bbfOv"></div>
    <div class="bbf-pop" id="bbfPop">
      <div class="bbf-pop-hdr"><h3 id="bbfPopTitle"></h3><button class="bbf-pop-cls" id="bbfPopClose">✕</button></div>
      <div class="bbf-pop-body" id="bbfPopBody"></div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  /* ---------- GALLERY AUTO-SCROLL ---------- */
  const track = document.getElementById('bbfTrack');
  const dots = document.querySelectorAll('.bbf-dot');
  let idx = 0;
  function goTo(i){
    idx = i;
    const imgWidth = track.children[0].getBoundingClientRect().width + 8; // + gap
    track.style.transform = `translateX(-${idx * imgWidth}px)`;
    dots.forEach((d,di)=> d.classList.toggle('on', di===idx));
  }
  dots.forEach(d => d.addEventListener('click', ()=> goTo(Number(d.dataset.i))));
  setInterval(()=> goTo((idx+1) % CONTENT.galleryImages.length), 3200);

  /* ---------- POPUP MODALS ---------- */
  const TITLES = { privacy:'Privacy Policy', terms:'Terms & Conditions', returns:'Return Policy', contact:'Contact Us' };
  const ov = document.getElementById('bbfOv');
  const pop = document.getElementById('bbfPop');
  const popTitle = document.getElementById('bbfPopTitle');
  const popBody = document.getElementById('bbfPopBody');

  document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', () => {
      const key = link.dataset.modal;
      popTitle.textContent = TITLES[key];
      popBody.innerHTML = CONTENT[key];
      ov.classList.add('on');
      pop.classList.add('on');
    });
  });
  function closePop(){ ov.classList.remove('on'); pop.classList.remove('on'); }
  ov.addEventListener('click', closePop);
  document.getElementById('bbfPopClose').addEventListener('click', closePop);

})();

