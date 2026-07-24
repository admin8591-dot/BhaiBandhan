// ===== UPI QR Payment Step — BhaiBandhan Store =====
// Just add this ONE line in index.html (before </body>):
//   <script src="upi-qr-payment.js"></script>
// No other edits needed. Hooks into your existing "Place Order"
// button and shows a payment screen: QR code + GPay/PhonePe/Paytm
// buttons (prefilled amount), then a "Payment Done" step that asks
// the customer to send a screenshot on WhatsApp.
//
// NOTE (honest limitation): the app-specific buttons (GPay/PhonePe/
// Paytm) use each app's own link scheme, which usually opens that
// exact app on Android. This is NOT 100% guaranteed on every phone/
// OS/browser — if that app isn't installed or the OS blocks it,
// nothing will happen when tapped. The QR code always works as a
// reliable fallback for any UPI app.

(function () {
  const UPI_ID = "jitenbehera@pingpay";   // your UPI ID
  const PAYEE_NAME = "BhaiBandhan";

  function buildUpiLink(amount, note) {
    return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function buildAppLink(scheme, amount, note) {
    return `${scheme}://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function buildQrImageUrl(upiLink) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;
  }

  function showQrModal(amount, onDone) {
    const note = "BhaiBandhan Order";
    const upiLink = buildUpiLink(amount, note);
    const qrImg = buildQrImageUrl(upiLink);

    // App-specific deep links (best-effort, see note at top of file)
    const gpayLink   = `tez://upi/pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    const phonepeLink = `phonepe://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    const paytmLink   = `paytmmp://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    const wrap = document.createElement('div');
    wrap.id = 'bbfQrWrap';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,Arial,sans-serif;';
    wrap.innerHTML = `
      <div style="background:#fff;border-radius:16px;max-width:340px;width:100%;padding:20px;text-align:center;position:relative;">
        <button id="bbfQrClose" style="position:absolute;top:10px;right:10px;width:30px;height:30px;border:none;background:#f2f2f2;border-radius:50%;font-size:16px;color:#555;cursor:pointer;line-height:1;">✕</button>

        <h3 style="margin:4px 0 4px;color:#8B1A1A;font-size:18px;">Scan &amp; Pay</h3>
        <p style="margin:0 0 12px;font-size:13px;color:#555;">Pay the exact amount via any UPI app</p>

        <img src="${qrImg}" alt="UPI QR" style="width:190px;height:190px;border:1px solid #eee;border-radius:10px;">
        <p style="font-size:22px;font-weight:800;color:#8B1A1A;margin:12px 0 2px;">₹${amount}</p>
        <p style="font-size:12px;color:#777;margin:0 0 14px;">UPI ID: ${UPI_ID}</p>

        <div style="display:flex;gap:8px;margin-bottom:14px;">
          <a href="${gpayLink}" style="flex:1;text-decoration:none;padding:10px 4px;background:#fff;border:1px solid #eee;border-radius:10px;font-size:11.5px;font-weight:700;color:#333;">Pay · Google Pay</a>
          <a href="${phonepeLink}" style="flex:1;text-decoration:none;padding:10px 4px;background:#fff;border:1px solid #eee;border-radius:10px;font-size:11.5px;font-weight:700;color:#333;">Pay · PhonePe</a>
          <a href="${paytmLink}" style="flex:1;text-decoration:none;padding:10px 4px;background:#fff;border:1px solid #eee;border-radius:10px;font-size:11.5px;font-weight:700;color:#333;">Pay · Paytm</a>
        </div>

        <button id="bbfPayDoneBtn" style="width:100%;padding:12px;background:linear-gradient(135deg,#25D366,#1ebe57);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:10px;">
          ✅ Payment Done — Send Screenshot
        </button>
        <button id="bbfPayCancelBtn" style="width:100%;padding:10px;background:#f2f2f2;color:#555;border:none;border-radius:10px;font-size:13px;cursor:pointer;">
          Cancel
        </button>
      </div>
    `;
    document.body.appendChild(wrap);

    function closeModal() { wrap.remove(); }

    document.getElementById('bbfQrClose').onclick = closeModal;
    document.getElementById('bbfPayCancelBtn').onclick = closeModal;
    document.getElementById('bbfPayDoneBtn').onclick = function () {
      closeModal();
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
        // Send a thank-you message on WhatsApp asking for the payment screenshot,
        // instead of the normal full order message.
        const thankYouMsg = `Thank you! 🙏 I've paid ₹${t.total} for my BhaiBandhan order.\n\n👤 Name: ${name}\n🏙️ City: ${city}\n\nHere is my payment screenshot:`;
        const waLink = `https://wa.me/${SITE_TEXT.whatsapp_number}?text=${encodeURIComponent(thankYouMsg)}`;

        cart = []; saveCart(); renderCartBadge();
        window.location.href = waLink;
      });
    };

    return true;
  }

  const timer = setInterval(function () {
    if (hookSubmitOrder()) clearInterval(timer);
  }, 150);
  setTimeout(() => clearInterval(timer), 20000);
})();
