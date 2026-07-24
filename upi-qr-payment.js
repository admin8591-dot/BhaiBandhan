// ===== UPI QR Payment Step — BhaiBandhan Store (Premium UI) =====
// Just add this ONE line in index.html (before </body>):
//   <script src="upi-qr-payment.js"></script>
// No other edits needed. Hooks into your existing "Place Order"
// button and shows a premium payment screen (QR + app buttons)
// before sending the order to WhatsApp.

(function () {
  const UPI_ID = "jitenbehera@pingpay";
  const PAYEE_NAME = "BhaiBandhan";
  const STORE_NAME = "BhaiBandhan";
  const STORE_LOGO = "https://bhaibandhan.shop/launchericon-192x192.png"; // change if your logo path differs

  function buildUpiLink(amount, note) {
    return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function buildQrImageUrl(upiLink) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}`;
  }

  // Attempts an app-specific UPI deep link; if the app isn't installed,
  // the browser stays put, so we fall back to the generic upi:// link
  // shortly after. This is a best-effort — no website can force a
  // specific app to open; the OS/browser makes that decision.
  function tryOpenApp(schemeLink, fallbackLink) {
    let didHide = false;
    const onHide = () => { didHide = true; };
    document.addEventListener('visibilitychange', onHide);
    window.location.href = schemeLink;
    setTimeout(() => {
      document.removeEventListener('visibilitychange', onHide);
      if (!didHide) {
        window.location.href = fallbackLink;
      }
    }, 1200);
  }

  function showQrModal(amount, onDone) {
    const note = "BhaiBandhan Order";
    const genericLink = buildUpiLink(amount, note);
    const qrImg = buildQrImageUrl(genericLink);

    const gpayLink   = `tez://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    const phonepeLink = `phonepe://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    const paytmLink   = `paytmmp://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    const wrap = document.createElement('div');
    wrap.id = 'bbfQrWrap';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(20,10,10,.65);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,Arial,sans-serif;backdrop-filter:blur(2px);';
    wrap.innerHTML = `
      <div style="background:#fff;border-radius:20px;max-width:360px;width:100%;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.35);position:relative;">

        <button id="bbfQrClose" aria-label="Close" style="position:absolute;top:12px;right:12px;width:30px;height:30px;border:none;border-radius:50%;background:rgba(255,255,255,.2);color:#fff;font-size:18px;line-height:1;cursor:pointer;z-index:2;">✕</button>

        <div style="background:linear-gradient(135deg,#8B1A1A,#5e1010);padding:22px 20px 18px;text-align:center;">
          <img src="${STORE_LOGO}" alt="${STORE_NAME}" style="width:44px;height:44px;border-radius:12px;object-fit:cover;margin-bottom:8px;box-shadow:0 2px 8px rgba(0,0,0,.3);">
          <div style="color:#fff;font-size:15px;font-weight:800;letter-spacing:.3px;">${STORE_NAME} Secure Pay</div>
          <div style="color:rgba(255,255,255,.75);font-size:11px;margin-top:2px;">Powered by UPI</div>
        </div>

        <div style="padding:22px 22px 24px;text-align:center;">
          <p style="margin:0 0 14px;font-size:12.5px;color:#666;">Scan the QR or pay directly using an app below</p>

          <img src="${qrImg}" alt="UPI QR" style="width:200px;height:200px;border:1px solid #eee;border-radius:12px;padding:6px;">

          <p style="font-size:26px;font-weight:800;color:#8B1A1A;margin:14px 0 2px;">₹${amount}</p>
          <p style="font-size:11.5px;color:#888;margin:0 0 18px;">UPI ID: ${UPI_ID}</p>

          <div style="display:flex;gap:10px;justify-content:center;margin-bottom:18px;">
            <button id="bbfGpayBtn" title="Google Pay" style="flex:1;padding:10px 6px;background:#fff;border:1.5px solid #eee;border-radius:12px;cursor:pointer;font-size:11px;font-weight:700;color:#333;">
              <div style="font-size:20px;margin-bottom:3px;">🅖</div>GPay
            </button>
            <button id="bbfPhonepeBtn" title="PhonePe" style="flex:1;padding:10px 6px;background:#fff;border:1.5px solid #eee;border-radius:12px;cursor:pointer;font-size:11px;font-weight:700;color:#333;">
              <div style="font-size:20px;margin-bottom:3px;">📱</div>PhonePe
            </button>
            <button id="bbfPaytmBtn" title="Paytm" style="flex:1;padding:10px 6px;background:#fff;border:1.5px solid #eee;border-radius:12px;cursor:pointer;font-size:11px;font-weight:700;color:#333;">
              <div style="font-size:20px;margin-bottom:3px;">💠</div>Paytm
            </button>
          </div>

          <button id="bbfPayDoneBtn" style="width:100%;padding:13px;background:linear-gradient(135deg,#25D366,#1ebe57);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(37,211,102,.35);">
            ✅ Payment Done — Send Order on WhatsApp
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    document.getElementById('bbfQrClose').onclick = () => wrap.remove();
    document.getElementById('bbfGpayBtn').onclick = () => tryOpenApp(gpayLink, genericLink);
    document.getElementById('bbfPhonepeBtn').onclick = () => tryOpenApp(phonepeLink, genericLink);
    document.getElementById('bbfPaytmBtn').onclick = () => tryOpenApp(paytmLink, genericLink);
    document.getElementById('bbfPayDoneBtn').onclick = function () {
      wrap.remove();
      onDone();
    };
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

      if (!name || !wp || !city || !addr || !pin) { err.textContent = '⚠️ Please fill all fields!'; err.style.display = 'block'; return; }
      if (wp.length !== 10 || isNaN(wp)) { err.textContent = '⚠️ Enter valid 10-digit WhatsApp number!'; err.style.display = 'block'; return; }
      if (pin.length !== 6 || isNaN(pin)) { err.textContent = '⚠️ Enter valid 6-digit PIN code!'; err.style.display = 'block'; return; }

      const t = calcTotals();

      showQrModal(t.total, async function () {
        await originalSubmitOrder();
      });
    };

    return true;
  }

  const timer = setInterval(function () {
    if (hookSubmitOrder()) clearInterval(timer);
  }, 150);
  setTimeout(() => clearInterval(timer), 20000);
})();

