/* ============================================================
   splash-inject.js
   Premium BhaiBandhan Splash Screen - Luxury Edition
   ============================================================ */

document.write(`
<div id="splash" style="position:fixed;inset:0;z-index:99999;background:radial-gradient(ellipse at center, #fdf6f0 0%, #f5ebe0 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .6s cubic-bezier(0.4,0,0.2,1);overflow:hidden">

  <!-- Subtle Background Pattern - Festive Threads -->
  <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.06" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="threads" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 0 L30 60 M0 30 L60 30" stroke="#8B1A1A" stroke-width="0.5" opacity="0.3"/>
        <circle cx="30" cy="30" r="2" fill="#8B1A1A" opacity="0.2"/>
        <circle cx="0" cy="0" r="1.5" fill="#8B1A1A" opacity="0.15"/>
        <circle cx="60" cy="60" r="1.5" fill="#8B1A1A" opacity="0.15"/>
      </pattern>
      <radialGradient id="glow">
        <stop offset="0%" stop-color="#8B1A1A" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#8B1A1A" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#threads)"/>
    <circle cx="50%" cy="50%" r="40%" fill="url(#glow)"/>
  </svg>

  <!-- Decorative Corner Accents - Premium Gold/Brown -->
  <div style="position:absolute;top:30px;left:30px;width:80px;height:80px;border-top:2px solid rgba(139,26,26,0.15);border-left:2px solid rgba(139,26,26,0.15);border-radius:4px 0 0 0;animation:cornerReveal 1.2s ease-out forwards"></div>
  <div style="position:absolute;top:30px;right:30px;width:80px;height:80px;border-top:2px solid rgba(139,26,26,0.15);border-right:2px solid rgba(139,26,26,0.15);border-radius:0 4px 0 0;animation:cornerReveal 1.2s ease-out 0.2s forwards;opacity:0"></div>
  <div style="position:absolute;bottom:30px;left:30px;width:80px;height:80px;border-bottom:2px solid rgba(139,26,26,0.15);border-left:2px solid rgba(139,26,26,0.15);border-radius:0 0 0 4px;animation:cornerReveal 1.2s ease-out 0.4s forwards;opacity:0"></div>
  <div style="position:absolute;bottom:30px;right:30px;width:80px;height:80px;border-bottom:2px solid rgba(139,26,26,0.15);border-right:2px solid rgba(139,26,26,0.15);border-radius:0 0 4px 0;animation:cornerReveal 1.2s ease-out 0.6s forwards;opacity:0"></div>

  <!-- Floating Festive Elements -->
  <div style="position:absolute;width:8px;height:8px;background:rgba(139,26,26,0.08);border-radius:50%;animation:floatA 12s ease-in-out infinite;top:15%;left:8%"></div>
  <div style="position:absolute;width:6px;height:6px;background:rgba(139,26,26,0.06);border-radius:50%;animation:floatB 14s ease-in-out infinite 2s;top:80%;right:10%"></div>
  <div style="position:absolute;width:10px;height:10px;background:rgba(139,26,26,0.05);border-radius:50%;animation:floatC 10s ease-in-out infinite 4s;top:20%;right:12%"></div>
  <div style="position:absolute;width:7px;height:7px;background:rgba(139,26,26,0.07);border-radius:50%;animation:floatD 16s ease-in-out infinite 1s;bottom:25%;left:15%"></div>

  <!-- Main Content Container -->
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;padding:20px;max-width:90%">

    <!-- Emoji with Entrance Animation -->
    <div style="font-size:80px;animation:emojiEntrance 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;transform:scale(0) rotate(-10deg);margin-bottom:8px">🪢</div>

    <!-- Brand Name with Slide-up Entrance -->
    <div style="font-size:32px;font-weight:900;color:#8B1A1A;letter-spacing:3px;text-shadow:0 2px 20px rgba(139,26,26,0.08);animation:slideUp 0.8s ease-out 0.2s forwards;transform:translateY(20px);opacity:0">BhaiBandhan</div>

    <!-- Tagline with Typing Animation -->
    <div style="margin-top:18px;height:28px;display:flex;align-items:center;justify-content:center;gap:6px">
      <span id="typing-text" style="font-size:16px;color:#8B1A1A;font-weight:400;letter-spacing:0.5px;opacity:0;animation:fadeIn 0.5s ease 0.6s forwards"></span>
      <span id="typing-cursor" style="font-size:18px;color:#8B1A1A;font-weight:300;animation:blink 0.9s step-end infinite;opacity:0;animation:fadeIn 0.5s ease 0.6s forwards">|</span>
    </div>

    <!-- Premium Progress Bar -->
    <div style="margin-top:35px;width:200px;max-width:70vw;height:3px;background:rgba(139,26,26,0.08);border-radius:4px;overflow:hidden;position:relative">
      <div id="progress-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#8B1A1A,#b34747,#8B1A1A);background-size:200% 100%;border-radius:4px;transition:width 0.3s cubic-bezier(0.4,0,0.2,1);animation:shimmer 1.5s ease-in-out infinite"></div>
    </div>

    <!-- Optional Subtle Sub-text -->
    <div style="margin-top:14px;font-size:11px;color:rgba(139,26,26,0.3);letter-spacing:2px;text-transform:uppercase;font-weight:400;animation:fadeIn 1s ease 1s forwards;opacity:0">Handmade with Love</div>
  </div>
</div>

<style>
/* Entrance Animations */
@keyframes emojiEntrance {
  0% { transform: scale(0) rotate(-10deg); opacity: 0; }
  60% { transform: scale(1.2) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(25px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes cornerReveal {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Floating Particle Animations */
@keyframes floatA {
  0%, 100% { transform: translate(0,0) scale(1); }
  25% { transform: translate(30px,-40px) scale(1.3); }
  50% { transform: translate(-20px,-20px) scale(0.8); }
  75% { transform: translate(40px,20px) scale(1.1); }
}

@keyframes floatB {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(-35px,30px) scale(1.2); }
  66% { transform: translate(25px,-25px) scale(0.9); }
}

@keyframes floatC {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(20px,40px) scale(1.4); }
}

@keyframes floatD {
  0%, 100% { transform: translate(0,0) scale(1); }
  25% { transform: translate(-40px,-30px) scale(1.1); }
  75% { transform: translate(30px,20px) scale(0.8); }
}
</style>
`);

// ==================== TYPING ANIMATION ====================
const taglines = [
  "Handmade Rakhis, Straight From the Heart",
  "Celebrating the Bond of Love",
  "Crafted with Care, Delivered with Joy",
  "Your Rakhi, Our Promise"
];

let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isFirstRun = true;
const typingSpeed = 50;
const deletingSpeed = 25;
const pauseDelay = 2000;
const initialDelay = 800;
const typingElement = document.getElementById('typing-text');

function typeMessage() {
  if (!typingElement) return;
  
  // Show cursor immediately
  const cursor = document.getElementById('typing-cursor');
  if (cursor && isFirstRun) {
    cursor.style.opacity = '1';
    isFirstRun = false;
  }
  
  const currentMsg = taglines[msgIndex];
  
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
      msgIndex = (msgIndex + 1) % taglines.length;
      setTimeout(typeMessage, 500);
      return;
    }
    setTimeout(typeMessage, deletingSpeed);
  }
}

// Start typing after initial delay
setTimeout(typeMessage, initialDelay);

// ==================== PROGRESS BAR ====================
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const totalDuration = 3000; // 3 seconds total
const updateInterval = 30; // Update every 30ms for smooth animation
const steps = totalDuration / updateInterval;
let currentStep = 0;

const progressInterval = setInterval(function() {
  currentStep++;
  progress = (currentStep / steps) * 100;
  
  // Cap at 95% until fully loaded
  if (progress > 95) progress = 95;
  
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
}, updateInterval);

// ==================== SPLASH REMOVAL ====================
let splashRemoved = false;

function hideSplash() {
  if (splashRemoved) return;
  splashRemoved = true;
  
  // Complete the progress bar
  if (progressBar) {
    progressBar.style.width = '100%';
    // Remove shimmer on completion
    progressBar.style.animation = 'none';
  }
  
  clearInterval(progressInterval);
  
  const s = document.getElementById('splash');
  if (!s) return;
  
  // Smooth fade + scale exit
  s.style.opacity = '0';
  s.style.transform = 'scale(1.02)';
  s.style.pointerEvents = 'none';
  
  setTimeout(function() {
    const el = document.getElementById('splash');
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, 600);
}

// MAIN: Show for exactly 3 seconds, then hide
setTimeout(function() {
  hideSplash();
}, totalDuration);

// EMERGENCY: Hide after 4.5 seconds (safety net)
setTimeout(function() {
  if (!splashRemoved) {
    hideSplash();
  }
}, 4500);

// Backup: Also hide on window load if it hasn't happened yet
window.addEventListener('load', function() {
  setTimeout(function() {
    if (!splashRemoved) {
      hideSplash();
    }
  }, 500);
});

// ==================== CLEANUP ====================
// Ensure no memory leaks
window.addEventListener('beforeunload', function() {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});
