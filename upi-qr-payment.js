// ===== UPI QR Payment Step — BhaiBandhan Store =====
// Just add this ONE line in index.html (before </body>):
//   <script src="upi-qr-payment.js"></script>
// No other edits needed. This automatically hooks into your
// existing "Place Order" button and adds a QR payment screen
// (with the amount pre-filled) before sending the order to WhatsApp.

(function () {
  const UPI_ID = "jitenbehera@pingpay";   // your UPI ID
  const PAYEE_NAME = "BhaiBandhan";

  function buildUpiLink(amount, note) {
    return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function buildQrImageUrl(upiLink) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiLink)}`;
  }

  function showQrModal(amount, waLink, onDone) {
    const upiLink = buildUpiLink(amount, "BhaiBandhan Order");
    const qrImg = buildQrImageUrl(upiLink);

    const wrap = document.createElement('div');
    wrap.id = 'bbfQrWrap';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,Arial,sans-serif;';
    wrap.innerHTML = `
      <div style="background:#fff;border-radius:16px;max-width:340px;width:100%;padding:22px;text-align:center;">
        <h3 style="margin:0 0 6px;color:#8B1A1A;font-size:18px;">Scan &amp; Pay</h3>
        <p style="margin:0 0 14px;font-size:13px;color:#555;">Pay the exact amount below via any UPI app</p>
        <img src="${qrImg}" alt="UPI QR" style="width:220px;height:220px;border:1px solid #eee;border-radius:10px;">
        <p style="font-size:22px;font-weight:800;color:#8B1A1A;margin:14px 0 4px;">₹${amount}</p>
        <p style="font-size:12px;color:#777;margin:0 0 18px;">UPI ID: ${UPI_ID}</p>
        <button id="bbfPayDoneBtn" style="width:100%;padding:12px;background:linear-gradient(135deg,#25D366,#1ebe57);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:10px;">
          ✅ Payment Done — Send Order on WhatsApp
        </button>
        <button id="bbfPayCancelBtn" style="width:100%;padding:10px;background:#f2f2f2;color:#555;border:none;border-radius:10px;font-size:13px;cursor:pointer;">
          Cancel
        </button>
      </div>
    `;
    document.body.appendChild(wrap);

    document.getElementById('bbfPayDoneBtn').onclick = function () {
      wrap.remove();
      onDone();
    };
    document.getElementById('bbfPayCancelBtn').onclick = function () {
      wrap.remove();
    };
  }

  function hookSubmitOrder() {
    if (typeof submitOrder !== 'function') return false;
    if (window.__bbfQrHooked) return true;
    window.__bbfQrHooked = true;

    const originalSubmitOrder = submitOrder;

    // Override the global submitOrder function
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

      showQrModal(t.total, null, async function () {
        // After user confirms payment, run the ORIGINAL submit flow
        // (saves order + redirects to WhatsApp), unchanged.
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
