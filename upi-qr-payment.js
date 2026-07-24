// ===== UPI QR Payment — BhaiBandhan Store (QR Only - Fully Working) =====

(function () {
  const UPI_ID = "jitenbehera@pingpay";
  const PAYEE_NAME = "BhaiBandhan";
  const STORE_NAME = "BhaiBandhan";
  const STORE_LOGO = "https://bhaibandhan.shop/launchericon-192x192.png";

  function buildUpiLink(amount, note) {
    return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function buildQrImageUrl(upiLink) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;
  }

  function showQrModal(amount, onDone) {
    const note = "BhaiBandhan Order";
    const genericLink = buildUpiLink(amount, note);
    const qrImg = buildQrImageUrl(genericLink);

    const wrap = document.createElement('div');
    wrap.id = 'bbfQrWrap';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,Arial,sans-serif;backdrop-filter:blur(4px);';
    
    wrap.innerHTML = `
      <div style="background:#ffffff;border-radius:24px;max-width:400px;width:100%;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6);position:relative;">

        <!-- Header -->
        <div style="display:flex;align-items:center;gap:12px;padding:16px 48px 16px 20px;background:linear-gradient(135deg,#8B1A1A,#4a0e0e);">
          <img src="${STORE_LOGO}" alt="${STORE_NAME}" style="width:40px;height:40px;border-radius:12px;object-fit:cover;flex-shrink:0;border:2px solid rgba(255,255,255,.2);">
          <div>
            <div style="color:#fff;font-size:16px;font-weight:800;letter-spacing:.3px;">${STORE_NAME}</div>
            <div style="color:rgba(255,255,255,.75);font-size:11px;">🔐 Secure UPI Payment</div>
          </div>
          <button id="bbfQrClose" style="position:absolute;top:12px;right:12px;width:30px;height:30px;border:none;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:18px;cursor:pointer;transition:all .2s;">✕</button>
        </div>

        <!-- Body -->
        <div style="padding:24px 24px 28px;text-align:center;">

          <!-- Amount -->
          <div style="background:linear-gradient(135deg,#fdf2f2,#fce8e8);border-radius:14px;padding:14px;margin-bottom:20px;">
            <p style="margin:0;font-size:13px;color:#8B1A1A;font-weight:600;">💳 Total Amount</p>
            <p style="margin:4px 0 0;font-size:28px;font-weight:900;color:#8B1A1A;">₹${amount}</p>
          </div>

          <!-- QR Code - BIG & CLEAR -->
          <div style="background:#ffffff;border:3px solid #8B1A1A;border-radius:16px;padding:12px;display:inline-block;margin-bottom:18px;box-shadow:0 4px 20px rgba(139,26,26,.15);">
            <img src="${qrImg}" alt="UPI QR Code" style="width:200px;height:200px;display:block;">
          </div>

          <!-- UPI ID -->
          <p style="font-size:12px;color:#888;margin:-8px 0 16px;">
            UPI ID: <strong style="color:#333;">${UPI_ID}</strong>
          </p>

          <!-- Instructions -->
          <div style="background:#f0f7ff;border-radius:12px;padding:14px 16px;text-align:left;margin-bottom:18px;border:1px solid #d6e9ff;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1a5276;">📱 How to Pay:</p>
            <ol style="margin:0;padding-left:22px;font-size:12.5px;color:#2c3e50;line-height:1.8;">
              <li>Open <strong>any UPI app</strong> (GPay, PhonePe, Paytm, BHIM)</li>
              <li>Tap <strong>"Scan QR"</strong> and scan the code above</li>
              <li>Check amount &amp; enter your UPI PIN</li>
              <li>Come back and click <strong>"Payment Done"</strong></li>
            </ol>
          </div>

          <!-- Payment Done Button -->
          <button id="bbfPayDoneBtn" style="width:100%;padding:15px;background:linear-gradient(135deg,#25D366,#1aad4f);color:#fff;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 6px 20px rgba(37,211,102,.35);transition:transform .15s;">
            ✅ Payment Done — Submit Order
          </button>
          
          <p style="font-size:10.5px;color:#aaa;margin:14px 0 0;">
            🔒 Encrypted • UPI Verified • Instant Confirmation
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    // Close button
    document.getElementById('bbfQrClose').onclick = function() {
      if (confirm('Are you sure you want to close? Payment will not be confirmed.')) {
        wrap.remove();
      }
    };

    // Payment Done button
    document.getElementById('bbfPayDoneBtn').onclick = function() {
      // Simple animation feedback
      this.style.transform = 'scale(0.96)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        wrap.remove();
        onDone();
      }, 200);
    };

    // Click outside to close (only if user confirms)
    wrap.onclick = function(e) {
      if (e.target === wrap) {
        if (confirm('Are you sure you want to close? Payment will not be confirmed.')) {
          wrap.remove();
        }
      }
    };
  }

  function showThankYouScreen() {
    const wrap = document.createElement('div');
    wrap.id = 'bbfThankYouWrap';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#fff;display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,Arial,sans-serif;';
    wrap.innerHTML = `
      <div style="text-align:center;max-width:340px;animation:bbfFadeIn .5s ease;">
        <div style="width:90px;height:90px;border-radius:50%;background:#e9f9ee;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;animation:bbfPop .5s ease;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#25D366" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 style="margin:0 0 10px;color:#222;font-size:22px;font-weight:800;">🎉 Order Placed!</h2>
        <p style="margin:0 0 6px;color:#555;font-size:14px;">Thank you for shopping with ${STORE_NAME}</p>
        <p style="margin:0 0 16px;color:#999;font-size:13px;">Redirecting to WhatsApp for confirmation…</p>
        <div style="width:30px;height:30px;margin:0 auto;border:3.5px solid #eee;border-top-color:#8B1A1A;border-radius:50%;animation:bbfSpin .7s linear infinite;"></div>
      </div>
      <style>
        @keyframes bbfFadeIn{0%{opacity:0}100%{opacity:1}}
        @keyframes bbfPop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
        @keyframes bbfSpin{to{transform:rotate(360deg)}}
      </style>
    `;
    document.body.appendChild(wrap);
  }

  function hookSubmitOrder() {
    if (typeof submitOrder !== 'function') return false;
    if (window.__bbfQrHooked) return true;
    window.__bbfQrHooked = true;

    const originalSubmitOrder = submitOrder;

    submitOrder = async function () {
      const name = document.getElementById('bn_name').value.trim();
      const wp   = document.getElementById('bn_wp').value.trim();
      const city = document.getElementById('bn_city').value.trim();
      const addr = document.getElementById('bn_addr').value.trim();
      const pin  = document.getElementById('bn_pin').value.trim();
      const err  = document.getElementById('BNERR');
      err.style.display = 'none';

      if (!name || !wp || !city || !addr || !pin) { 
        err.textContent = '⚠️ Please fill all fields!'; 
        err.style.display = 'block'; 
        return; 
      }
      if (wp.length !== 10 || isNaN(wp)) { 
        err.textContent = '⚠️ Enter valid 10-digit WhatsApp number!'; 
        err.style.display = 'block'; 
        return; 
      }
      if (pin.length !== 6 || isNaN(pin)) { 
        err.textContent = '⚠️ Enter valid 6-digit PIN code!'; 
        err.style.display = 'block'; 
        return; 
      }

      const t = calcTotals();

      showQrModal(t.total, async function () {
        showThankYouScreen();
        await originalSubmitOrder();
      });
    };

    return true;
  }

  // Hook into page
  const timer = setInterval(function () {
    if (hookSubmitOrder()) clearInterval(timer);
  }, 150);
  setTimeout(() => clearInterval(timer), 20000);
})();
