/* ============================================================
   splash-inject.js
   Injects the splash screen instantly using document.write —
   this is the ONE file that makes it a true single-line include.
   ============================================================ */

document.write(`
<div id="splash" style="position:fixed;inset:0;z-index:99999;background:#fdf6f0;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .5s ease">
  <div style="font-size:60px;animation:bounce 1s ease infinite">🪢</div>
  <div style="margin-top:14px;font-size:20px;font-weight:900;color:#8B1A1A">BhaiBandhan</div>
  <div style="margin-top:16px;width:36px;height:36px;border:4px solid rgba(139,26,26,.15);border-top-color:#8B1A1A;border-radius:50%;animation:spin .8s linear infinite"></div>
</div>
<style>
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
</style>
`);

window.addEventListener('load', function(){
  setTimeout(function(){
    const s = document.getElementById('splash');
    if(!s) return;
    s.style.opacity = '0';
    setTimeout(() => s.remove(), 500);
  }, 800); // raise to 1200-1500 if products still pop in after splash fades
});
