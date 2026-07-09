/* =====================================================================
   BhaiBandhan — Premium Footer Widget (bb-footer.js)
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo (same repo as your site).
   2. In your already-deployed index.html, add ONE line right before
      the closing </body> tag:

        <script src="bb-footer.js"></script>

   3. Done — this injects the gallery strip, footer, and the exact
      Privacy/Terms/Return/Contact popups (matching your screenshots)
      at the bottom of the page. Nothing in index.html needs to change.

   To edit any wording, edit the CONTENT object below directly.
   ===================================================================== */

(function(){

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
    whatsappNumber: "917608053740",
    email: "costumegiftskart@gmail.com",
    location: "Balasore, Odisha, India",
    deliveryLine: "📦 Free delivery on orders above ₹299 · Delivery in 5–7 days",

    privacy: {
      icon: "🔒",
      tag: "Last updated: June 2025",
      body: `
        <p>BhaiBandhan is committed to protecting your privacy.</p>
        <h4>Information We Collect</h4>
        <p>When you place an order, we collect only your name, mobile number, WhatsApp number, and delivery address. We do not store any payment details.</p>
        <h4>How We Use It</h4>
        <p>Your information is used solely to process your order and contact you on WhatsApp for delivery updates.</p>
        <h4>Data Sharing</h4>
        <p>We do not sell, share, or trade your personal information with any third party under any circumstances.</p>
        <h4>Contact</h4>
        <p>For privacy concerns, email us at <b>costumegiftskart@gmail.com</b></p>
      `
    },

    terms: {
      icon: "📋",
      tag: "Last updated: June 2025",
      body: `
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
      `
    },

    returns: {
      icon: "🔄",
      tag: "Handmade — No Return / No Exchange",
      body: `
        <p>Every rakhi at BhaiBandhan is <b>handcrafted individually and made fresh for your order.</b> It is a one-time creation — not a factory product.</p>
        <h4>Why No Returns?</h4>
        <ul>
          <li>Each rakhi is made specifically for your order from scratch.</li>
          <li>Handmaking involves dedicated time, skill, and raw materials that cannot be recovered.</li>
          <li>Once crafted and dispatched, the product cannot be reused or offered to anyone else.</li>
          <li>Just like a painting made for you — it belongs only to you.</li>
        </ul>
        <h4>Our Quality Promise</h4>
        <ul>
          <li>We pack every order carefully for safe delivery.</li>
          <li>Product quality matches what is shown in photos.</li>
          <li>Every piece is inspected before dispatch.</li>
        </ul>
        <h4>Important</h4>
        <p>Please review product images and description carefully before ordering. Once confirmed, orders <b>cannot be cancelled, returned, or exchanged.</b></p>
      `
    },

    contact: { icon: "📞" } // rendered specially below (buttons), not plain body
  };

  /* ---------- STYLES ---------- */
  const css = `
    .bbf-wrap{background:#fdf6f0;padding:24px 16px 10px;text-align:center;font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto}
    .bbf-badge{display:inline-block;background:#fff;border:1px solid rgba(139,26,26,.2);color:#8B1A1A;font-size:12px;font-weight:700;padding:6px 16px;border-radius:20px;margin-bottom:14px}
    .bbf-title{font-size:20px;font-weight:900;color:#8B1A1A;margin-bottom:8px}
    .bbf-sub{font-size:13px;color:#666;line-height:1.6;margin-bottom:18px}
    .bbf-gal{overflow:hidden;border-radius:14px;margin-bottom:10px}
    .bbf-gal-track{display:flex;gap:8px;transition:transform .5s cubic-bezier(.25,.8,.25,1)}
    .bbf-gal-track img{width:100%;flex-shrink:0;height:220px;object-fit:cover;border-radius:14px}
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
    .bbf-pop{display:none;position:fixed;bottom:0;left:0;right:0;max-width:600px;margin:0 auto;background:#fffaf5;border-radius:20px 20px 0 0;z-index:99997;max-height:82vh;overflow-y:auto;transform:translateY(100%);transition:transform .35s cubic-bezier(.34,1.2,.64,1)}
    .bbf-pop.on{display:block;transform:translateY(0)}
    .bbf-pop-hdr{display:flex;justify-content:space-between;align-items:center;padding:18px 18px 14px;border-bottom:1px solid rgba(0,0,0,.08)}
    .bbf-pop-hdr h3{color:#8B1A1A;font-size:17px;display:flex;align-items:center;gap:8px}
    .bbf-pop-cls{width:30px;height:30px;background:rgba(139,26,26,.1);border:none;border-radius:50%;color:#8B1A1A;font-size:14px;cursor:pointer;flex-shrink:0}
    .bbf-pop-body{padding:18px}
    .bbf-pop-body p{font-size:14px;color:#222;line-height:1.7;margin-bottom:10px}
    .bbf-pop-body h4{font-size:14.5px;color:#8B1A1A;margin:14px 0 6px}
    .bbf-pop-body ul{padding-left:18px;margin-bottom:10px}
    .bbf-pop-body li{font-size:14px;color:#222;line-height:1.7;margin-bottom:6px}
    .bbf-tag{display:inline-block;background:rgba(139,26,26,.08);border:1px solid rgba(139,26,26,.2);color:#8B1A1A;font-size:11.5px;font-weight:700;padding:5px 14px;border-radius:20px;margin-bottom:14px}

    .bbf-cbtn{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:12px;margin-bottom:12px;text-decoration:none;color:#fff;cursor:pointer}
    .bbf-cbtn .ic{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
    .bbf-cbtn b{font-size:14.5px;display:block}
    .bbf-cbtn span{font-size:12.5px;opacity:.95}
    .bbf-cbtn.wa{background:linear-gradient(135deg,#25D366,#128C4A)}
    .bbf-cbtn.mail{background:linear-gradient(135deg,#e74c3c,#c0392b)}
    .bbf-infobox{background:rgba(139,26,26,.06);border-radius:12px;padding:14px 16px}
    .bbf-infobox div{font-size:13.5px;color:#333;padding:6px 0;display:flex;gap:8px}
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
    const imgWidth = track.children[0].getBoundingClientRect().width + 8;
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

  function renderContactBody(){
    return `
      <p>We are happy to help! Tap below to reach us. We respond within 24 hours.</p>
      <a class="bbf-cbtn wa" href="https://wa.me/${CONTENT.whatsappNumber}" target="_blank">
        <div class="ic">📱</div>
        <div><b>Chat on WhatsApp</b><span>${CONTENT.phone}</span></div>
      </a>
      <a class="bbf-cbtn mail" href="mailto:${CONTENT.email}">
        <div class="ic">✉️</div>
        <div><b>Send an Email</b><span>${CONTENT.email}</span></div>
      </a>
      <div class="bbf-infobox">
        <div>📍 <b>Location:</b>&nbsp;${CONTENT.location}</div>
        <div>🕐 <b>Hours:</b>&nbsp;Mon–Sat, 10 AM – 7 PM</div>
        <div>⚡ <b>Response:</b>&nbsp;Within 24 hours</div>
      </div>
    `;
  }

  document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', () => {
      const key = link.dataset.modal;
      const c = CONTENT[key];
      popTitle.innerHTML = `${c.icon} ${TITLES[key]}`;
      if(key === 'contact'){
        popBody.innerHTML = renderContactBody();
      } else {
        popBody.innerHTML = `<div class="bbf-tag">${c.tag}</div>${c.body}`;
      }
      ov.classList.add('on');
      pop.classList.add('on');
    });
  });
  function closePop(){ ov.classList.remove('on'); pop.classList.remove('on'); }
  ov.addEventListener('click', closePop);
  document.getElementById('bbfPopClose').addEventListener('click', closePop);

})();

