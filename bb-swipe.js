/* =====================================================================
   BhaiBandhan — Product Gallery Swipe (bb-swipe.js)
   ---------------------------------------------------------------------
   HOW TO USE:
   1. Upload this file to your GitHub repo (same repo as your site).
   2. In your index.html, add ONE line right before the closing
      </body> tag:

        <script src="bb-swipe.js"></script>

   3. Done — swiping left/right on a product's image now moves to
      the next/previous photo, same as Flipkart/Amazon.

   This works without touching any of your existing product-modal
   code — it listens for swipes anywhere on the gallery and calls
   your existing window.goSlide() function automatically.
   ===================================================================== */

(function(){
  let touchStartX = 0;

  document.addEventListener('touchstart', function(e){
    if(e.target.closest('.sw')) touchStartX = e.touches[0].clientX;
  }, {passive:true});

  document.addEventListener('touchend', function(e){
    const swEl = e.target.closest('.sw');
    if(!swEl) return;

    const dx = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(dx) < 40) return; // ignore tiny movements/taps

    const dots = document.querySelectorAll('#SD .d');
    if(dots.length === 0) return;

    let current = 0;
    dots.forEach((d,i)=>{ if(d.classList.contains('on')) current = i; });

    let next = current;
    if(dx < 0 && current < dots.length - 1) next = current + 1; // swipe left -> next
    else if(dx > 0 && current > 0) next = current - 1;          // swipe right -> previous

    if(next !== current && typeof window.goSlide === 'function'){
      window.goSlide(next);
    }
  }, {passive:true});
})();

