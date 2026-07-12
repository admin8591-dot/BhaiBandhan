/* ============================================================
   splash-inject.js
   BhaiBandhan Splash Screen — clean, branded, 3-second intro
   ============================================================ */

document.write(`
<div id="splash" style="position:fixed;inset:0;z-index:99999;background:linear-gradient(160deg,#fdf6f0 0%,#f7ebe0 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;transition:opacity .6s ease,transform .6s ease">

  <!-- Faded decorative wallpaper pattern -->
  <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.09" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="bbpat" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
        <text x="8" y="30" font-size="22">🪢</text>
        <circle cx="55" cy="55" r="2" fill="#8B1A1A"/>
        <circle cx="10" cy="60" r="1.4" fill="#8B1A1A"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bbpat)"/>
  </svg>

  <!-- Soft glow behind logo -->
  <div style="position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(139,26,26,0.10) 0%,rgba(139,26,26,0) 70%)"></div>

  <div style="position:relative;z-index:2;padding:24px;max-width:88%">

    <div style="font-size:66px;transform:scale(0);animation:bbPop .7s cubic-bezier(.34,1.6,.64,1) forwards">🪢</div>

    <div style="font-size:30px;font-weight:900;color:#8B1A1A;letter-spacing:1px;margin-top:6px;opacity:0;transform:translateY(16px);animation:bbUp .6s ease .25s forwards">BhaiBandhan</div>

    <div style="margin-top:12px;min-height:22px;font-size:14.5px;color:#8B1A1A;font-weight:600">
      <span id="bb-type"></span><span id="bb-cursor" style="animation:bbBlink .9s step-end infinite">|</span>
    </div>

    <div id="bb-about" style="margin-top:14px;font-size:11.5px;color:#7a5a52;line-height:1.6;opacity:0;transition:opacity .6s ease;padding:0 6px">
      हर राखी हाथों से बनी, हर भाई-बहन के प्यार के लिए। Kundan, pearls और personalised photo rakhis — pure handmade, no machines.
    </div>

    <div style="margin-top:24px;width:180px;max-width:60vw;height:3px;background:rgba(139,26,26,.1);border-radius:4px;overflow:hidden;margin-left:auto;margin-right:auto">
      <div id="bb-bar" style="height:100%;width:0%;background:#8B1A1A;border-radius:4px;transition:width .1s linear"></div>
    </div>

    <div id="bb-thanks" style="margin-top:20px;font-size:11px;color:rgba(139,26,26,.55);letter-spacing:.5px;opacity:0;transition:opacity .5s ease">
      🙏 Thanks for visiting BhaiBandhan
    </div>
  </div>
</div>

<style>
@keyframes bbPop{0%{transform:scale(0) rotate(-8deg);opacity:0}70%{transform:scale(1.15) rotate(2deg);opacity:1}100%{transform:scale(1) rotate(0)}}
@keyframes bbUp{to{opacity:1;transform:translateY(0)}}
@keyframes bbBlink{50%{opacity:0}}
</style>
`);

// ---- Typing (single line, no restart loop — keeps a 3s intro calm) ----
const bbLine = "Handmade Rakhis, Straight From the Heart";
let bbI = 0;
function bbType(){
  const el = document.getElementById('bb-type');
  if(!el) return;
  el.textContent = bbLine.substring(0, bbI + 1);
  bbI++;
  if(bbI < bbLine.length) setTimeout(bbType, 38);
  else {
    document.getElementById('bb-cursor').style.display = 'none';
    document.getElementById('bb-about').style.opacity = '1';
  }
}
setTimeout(bbType, 350);

// ---- Progress bar over 3s ----
const bbStart = Date.now();
const bbDuration = 3000;
const bbBar = () => document.getElementById('bb-bar');
const bbInterval = setInterval(function(){
  const pct = Math.min(100, ((Date.now() - bbStart) / bbDuration) * 100);
  if(bbBar()) bbBar().style.width = pct + '%';
  if(pct >= 100) clearInterval(bbInterval);
}, 30);

// ---- Thank-you note near the end ----
setTimeout(function(){
  const t = document.getElementById('bb-thanks');
  if(t) t.style.opacity = '1';
}, 2100);

// ---- Remove splash after exactly 3s ----
let bbDone = false;
function bbHide(){
  if(bbDone) return;
  bbDone = true;
  const s = document.getElementById('splash');
  if(!s) return;
  s.style.opacity = '0';
  s.style.transform = 'scale(1.02)';
  setTimeout(() => s.remove(), 500);
}
setTimeout(bbHide, 3000);
window.addEventListener('load', function(){ setTimeout(function(){ if(!bbDone) bbHide(); }, 3200); });

