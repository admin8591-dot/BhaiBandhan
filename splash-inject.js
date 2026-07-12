/* ============================================================
   splash-inject.js
   Premium splash screen with typing animations & decorative elements
   ============================================================ */

document.write(`
<div id="splash" style="position:fixed;inset:0;z-index:99999;background:#fdf6f0;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s ease;overflow:hidden">
  
  <!-- Decorative Corner Elements - Brown Criss-Cross Lines -->
  <div style="position:absolute;top:20px;left:20px;width:60px;height:60px;border-top:3px solid #8B1A1A;border-left:3px solid #8B1A1A;opacity:0.3;animation:cornerPulse 2s ease-in-out infinite"></div>
  <div style="position:absolute;top:20px;right:20px;width:60px;height:60px;border-top:3px solid #8B1A1A;border-right:3px solid #8B1A1A;opacity:0.3;animation:cornerPulse 2s ease-in-out infinite 0.5s"></div>
  <div style="position:absolute;bottom:20px;left:20px;width:60px;height:60px;border-bottom:3px solid #8B1A1A;border-left:3px solid #8B1A1A;opacity:0.3;animation:cornerPulse 2s ease-in-out infinite 1s"></div>
  <div style="position:absolute;bottom:20px;right:20px;width:60px;height:60px;border-bottom:3px solid #8B1A1A;border-right:3px solid #8B1A1A;opacity:0.3;animation:cornerPulse 2s ease-in-out infinite 1.5s"></div>
  
  <!-- Inner Corner Accents -->
  <div style="position:absolute;top:35px;left:35px;width:30px;height:30px;border-top:2px solid #8B1A1A;border-left:2px solid #8B1A1A;opacity:0.2;animation:cornerPulse 2.5s ease-in-out infinite 0.3s"></div>
  <div style="position:absolute;top:35px;right:35px;width:30px;height:30px;border-top:2px solid #8B1A1A;border-right:2px solid #8B1A1A;opacity:0.2;animation:cornerPulse 2.5s ease-in-out infinite 0.8s"></div>
  <div style="position:absolute;bottom:35px;left:35px;width:30px;height:30px;border-bottom:2px solid #8B1A1A;border-left:2px solid #8B1A1A;opacity:0.2;animation:cornerPulse 2.5s ease-in-out infinite 1.3s"></div>
  <div style="position:absolute;bottom:35px;right:35px;width:30px;height:30px;border-bottom:2px solid #8B1A1A;border-right:2px solid #8B1A1A;opacity:0.2;animation:cornerPulse 2.5s ease-in-out infinite 1.8s"></div>

  <!-- Decorative Diagonal Lines -->
  <div style="position:absolute;top:50%;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,#8B1A1A,transparent);opacity:0.08;transform:rotate(-15deg) scale(1.5)"></div>
  <div style="position:absolute;top:50%;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,#8B1A1A,transparent);opacity:0.08;transform:rotate(15deg) scale(1.5)"></div>

  <!-- Floating Particles -->
  <div style="position:absolute;width:6px;height:6px;background:#8B1A1A;border-radius:50%;opacity:0.15;animation:floatParticle 8s ease-in-out infinite;top:15%;left:10%"></div>
  <div style="position:absolute;width:4px;height:4px;background:#8B1A1A;border-radius:50%;opacity:0.12;animation:floatParticle 10s ease-in-out infinite 1s;top:75%;left:85%"></div>
  <div style="position:absolute;width:5px;height:5px;background:#8B1A1A;border-radius:50%;opacity:0.10;animation:floatParticle 9s ease-in-out infinite 2s;top:85%;right:10%"></div>
  <div style="position:absolute;width:3px;height:3px;background:#8B1A1A;border-radius:50%;opacity:0.15;animation:floatParticle 7s ease-in-out infinite 0.5s;top:20%;right:15%"></div>
  <div style="position:absolute;width:7px;height:7px;background:#8B1A1A;border-radius:50%;opacity:0.08;animation:floatParticle 11s ease-in-out infinite 3s;top:60%;left:5%"></div>

  <!-- Main Content -->
  <div style="font-size:70px;animation:bounce 1.2s ease infinite;margin-bottom:5px">🪢</div>
  <div style="font-size:28px;font-weight:900;color:#8B1A1A;letter-spacing:2px;text-shadow:0 2px 10px rgba(139,26,26,0.1)">BhaiBandhan</div>
  
  <!-- Typing Animation Container -->
  <div id="typing-container" style="margin-top:15px;height:30px;display:flex;align-items:center;justify-content:center;gap:8px">
    <span id="typing-text" style="font-size:17px;color:#8B1A1A;font-weight:500;letter-spacing:0.5px"></span>
    <span id="typing-cursor" style="font-size:20px;color:#8B1A1A;font-weight:300;animation:blink 0.8s step-end infinite">|</span>
  </div>

  <div style="margin-top:20px;width:40px;height:40px;border:4px solid rgba(139,26,26,.12);border-top-color:#8B1A1A;border-radius:50%;animation:spin .9s linear infinite"></div>
  
  <!-- Progress Bar -->
  <div style="margin-top:20px;width:120px;height:2px;background:rgba(139,26,26,0.1);border-radius:2px;overflow:hidden">
    <div id="progress-bar" style="height:100%;width:0%;background:#8B1A1A;border-radius:2px;transition:width 0.3s ease"></div>
  </div>
</div>

<style>
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes cornerPulse{0%,100%{opacity:0.2;transform:scale(1)}50%{opacity:0.5;transform:scale(1.05)}}
@keyframes floatParticle{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(20px,-30px) scale(1.2)}50%{transform:translate(-15px,-10px) scale(0.8)}75%{transform:translate(30px,20px) scale(1.1)}}
</style>
`);

// ==================== TYPING ANIMATION ====================
const messages = [
  "🎉 Welcome to BhaiBandhan!",
  "✨ Happy Rakhi Shopping!",
  "🛍️ Explore our collection",
  "💝 Find the perfect rakhi",
  "🌟 Celebrate the bond!"
];

let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 60;
const deletingSpeed = 30;
const pauseDelay = 1500;
const typingElement = document.getElementById('typing-text');

function typeMessage() {
  if (!typingElement) return;
  
  const currentMsg = messages[msgIndex];
  
  if (!isDeleting) {
    // Typing
    typingElement.textContent = currentMsg.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentMsg.length) {
      isDeleting = true;
      setTimeout(typeMessage, pauseDelay);
      return;
    }
    setTimeout(typeMessage, typingSpeed);
  } else {
    // Deleting
    typingElement.textContent = currentMsg.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
      setTimeout(typeMessage, 500);
      return;
    }
    setTimeout(typeMessage, deletingSpeed);
  }
}

// Start typing after 0.5s
setTimeout(typeMessage, 500);

// ==================== PROGRESS BAR ====================
let progress = 0;
const progressBar = document.getElementById('progress-bar');

const progressInterval = setInterval(function() {
  if (progress < 90) {
    progress += Math.random() * 3 + 1;
    if (progress > 90) progress = 90;
    if (progressBar) progressBar.style.width = progress + '%';
  }
}, 200);

// ==================== SPLASH REMOVAL ====================
let splashRemoved = false;

function hideSplash() {
  if (splashRemoved) return;
  splashRemoved = true;
  
  // Complete the progress bar
  if (progressBar) progressBar.style.width = '100%';
  
  clearInterval(progressInterval);
  
  const s = document.getElementById('splash');
  if (!s) return;
  s.style.opacity = '0';
  setTimeout(function() {
    const el = document.getElementById('splash');
    if (el) el.remove();
  }, 600);
}

// MAIN: Hide on load + 1.5 SECOND DELAY
window.addEventListener('load', function() {
  setTimeout(hideSplash, 1500);
});

// Emergency hide after 5 seconds
setTimeout(hideSplash, 5000);

// Smart product detection
let productCheckInterval = setInterval(function() {
  const productSelectors = [
    '.product', '.product-item', '.product-card', 
    '[data-product]', '.item', '.card',
    '.rakhi-product', '.product-container',
    '.product-grid', '.products-list'
  ];
  
  let productsFound = false;
  for (let selector of productSelectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      productsFound = true;
      break;
    }
  }
  
  if (productsFound) {
    const images = document.querySelectorAll('.product img, .product-item img, .product-card img, [data-product] img, .item img');
    let loadedImages = 0;
    images.forEach(img => {
      if (img.complete && img.naturalWidth > 0) loadedImages++;
    });
    
    if (images.length === 0 || loadedImages >= Math.min(images.length, 3)) {
      clearInterval(productCheckInterval);
      // Give a small buffer after products appear
      setTimeout(hideSplash, 500);
    }
  }
}, 100);

// Clean up interval after 6 seconds
setTimeout(function() {
  if (productCheckInterval) {
    clearInterval(productCheckInterval);
    productCheckInterval = null;
  }
}, 6000);
