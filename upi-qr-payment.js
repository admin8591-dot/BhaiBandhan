// ===== UPI QR Payment Step — BhaiBandhan Store (WITH APP BUTTONS FIXED) =====

(function () {
  const UPI_ID = "jitenbehera@pingpay";
  const PAYEE_NAME = "BhaiBandhan";
  const STORE_NAME = "BhaiBandhan";
  const STORE_LOGO = "https://bhaibandhan.shop/launchericon-192x192.png";

  function buildUpiLink(amount, note) {
    return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function buildQrImageUrl(upiLink) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}`;
  }

  // Smart UPI opener — tries app, falls back to QR instruction if fails
  function openUpiApp(amount, note, appHint) {
    const upiLink = buildUpiLink(amount, note);
    
    // Try to open with UPI link (phone will choose default app)
    window.location.href = upiLink;
    
    // Show a small toast/notification if app doesn't open
    setTimeout(() => {
      // If user is still on page, app didn't open
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 20px;border-radius:10px;z-index:9999999;font-size:13px;max-width:90%;text-align:center;box-shadow:0 4px 15px rgba(0,0,0,.3);';
      toast.innerHTML = `
        ⚠️ Couldn't open ${appHint}. Please scan the QR code above instead.
        <button onclick="this.parentElement.remove()" style="margin-left:10px;background:#fff;border:none;border-radius:5px;padding:2px 10px;cursor:pointer;">OK</button>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 5000);
    }, 2000);
  }

  function showQrModal(amount, onDone) {
    const note = "BhaiBandhan Order";
    const genericLink = buildUpiLink(amount, note);
    const qrImg = buildQrImageUrl(genericLink);

    const wrap = document.createElement('div');
    wrap.id = 'bbfQrWrap';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,Arial,sans-serif;backdrop-filter:blur(3px);';
    
    wrap.innerHTML = `
      <div style="background:#fff;border-radius:20px;max-width:380px;width:100%;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,.5);position:relative;">

        <!-- Header -->
        <div style="display:flex;align-items:center;gap:10px;padding:14px 44px 14px 18px;background:linear-gradient(135deg,#8B1A1A,#5e1010);">
          <img src="${STORE_LOGO}" alt="${STORE_NAME}" style="width:38px;height:38px;border-radius:10px;object-fit:cover;flex-shrink:0;">
          <div>
            <div style="color:#fff;font-size:15px;font-weight:800;">${STORE_NAME} Payment</div>
            <div style="color:rgba(255,255,255,.7);font-size:11px;">🔒 Secure UPI Payment</div>
          </div>
          <button id="bbfQrClose" style="position:absolute;top:10px;right:10px;width:28px;height:28px;border:none;border-radius:50%;background:rgba(255,255,255,.15);color:#fff;font-size:16px;cursor:pointer;">✕</button>
        </div>

        <div style="padding:20px 24px 24px;text-align:center;">

          <div style="background:#f8f0f0;border-radius:12px;padding:12px;margin-bottom:16px;">
            <p style="margin:0;font-size:14px;color:#8B1A1A;font-weight:700;">
              💰 ₹${amount}
            </p>
            <p style="margin:4px 0 0;font-size:11px;color:#666;">
              UPI: ${UPI_ID}
            </p>
          </div>

          <!-- QR Code -->
          <div style="background:#fff;border:2px solid #8B1A1A;border-radius:12px;padding:10px;display:inline-block;margin-bottom:16px;">
            <img src="${qrImg}" alt="UPI QR Code" style="width:160px;height:160px;display:block;">
          </div>

          <!-- App Buttons - FIXED VERSION -->
          <p style="font-size:12px;color:#666;margin:0 0 10px;">👇 Pay with your favourite UPI app</p>
          
          <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap;">
            <button id="bbfGpayBtn" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:#fff;border:1.5px solid #ddd;border-radius:10px;cursor:pointer;font-size:12px;font-weight:600;">
              <img src="https://img.icons8.com/color/28/google-pay.png" alt="GPay"> Google Pay
            </button>
            <button id="bbfPhonepeBtn" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:#fff;border:1.5px solid #ddd;border-radius:10px;cursor:pointer;font-size:12px;font-weight:600;">
              <img src="https://cdn.simpleicons.org/phonepe/5F259F" style="width:24px;height:24px;" alt="PhonePe"> PhonePe
            </button>
            <button id="bbfPaytmBtn" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:#fff;border:1.5px solid #ddd;border-radius:10px;cursor:pointer;font-size:12px;font-weight:600;">
              <img src="https://img.icons8.com/color/28/paytm.png" alt="Paytm"> Paytm
            </button>
          </div>

          <div style="background:#fef9e7;border-left:3px solid #f39c12;padding:8px 12px;border-radius:6px;margin-bottom:14px;text-align:left;">
            <p style="margin:0;font-size:11px;color:#7d6608;">
              💡 <strong>Tip:</strong> If app doesn't open, simply scan the QR code above with any UPI app
            </p>
          </div>

          <!-- Pay Done Button -->
          <button id="bbfPayDoneBtn" style="width:100%;padding:14px;background:linear-gradient(135deg,#25D366,#1ebe57);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 15px rgba(37,211,102,.4);">
            ✅ I've Made the Payment — Submit Order
          </button>
          
          <p style="font-size:10px;color:#999;margin:12px 0 0;">
            🔒 Secure • UPI Verified • 100% Safe
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    // Close button
    document.getElementById('bbfQrClose').onclick = () => wrap.remove();

    // APP BUTTONS - FIXED: Use generic UPI link instead of app-specific
    document.getElementById('bbfGpayBtn').onclick = function() {
      openUpiApp(amount, note, "Google Pay");
    };
    
    document.getElementById('bbfPhonepeBtn').onclick = function() {
      openUpiApp(amount, note, "PhonePe");
    };
    
    document.getElementById('bbfPaytmBtn').onclick = function() {
      openUpiApp(amount, note, "Paytm");
    };

    // Payment Done button
    document.getElementById('bbfPayDoneBtn').onclick = function () {
      wrap.remove();
      onDone();
    };
  }

  function showThankYouScreen() {
    // ... (same as before)
  }

  function hookSubmitOrder() {
    // ... (same as before)
  }

  const timer = setInterval(function () {
    if (hookSubmitOrder()) clearInterval(timer);
  }, 150);
  setTimeout(() => clearInterval(timer), 20000);
})();
