/* ============================================================
   products-loader.js
   - Shows skeleton product cards INSTANTLY (no blank "Loading..." text)
   - Shows cached products immediately if visited before (0 wait)
   - Fetches fresh data in background, updates when ready
   ============================================================ */

// 👇 REPLACE with your real Apps Script product endpoint
const PRODUCTS_URL = "YOUR_APPS_SCRIPT_URL_HERE?action=getProducts";

const CACHE_KEY = "bb_products_cache_v1";

// Inject skeleton shimmer CSS
(function injectSkeletonCSS(){
  const css = `
  .sk{pointer-events:none}
  .sk-img{background:linear-gradient(90deg,#f0e6dc 25%,#e8dccb 37%,#f0e6dc 63%);background-size:400% 100%;animation:shimmer 1.4s ease infinite}
  .sk-line{height:11px;border-radius:4px;background:linear-gradient(90deg,#f0e6dc 25%,#e8dccb 37%,#f0e6dc 63%);background-size:400% 100%;animation:shimmer 1.4s ease infinite;margin-bottom:8px}
  .sk-btn{height:38px;border-radius:9px;background:linear-gradient(90deg,#f0e6dc 25%,#e8dccb 37%,#f0e6dc 63%);background-size:400% 100%;animation:shimmer 1.4s ease infinite}
  @keyframes shimmer{0%{background-position:100% 0}100%{background-position:0 0}}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

function skeletonCard(){
  return `<div class="pc sk">
    <div class="pi sk-img"></div>
    <div class="pn">
      <div class="sk-line" style="width:70%"></div>
      <div class="sk-line" style="width:95%"></div>
      <div class="sk-line" style="width:60%"></div>
      <div class="sk-btn"></div>
    </div>
  </div>`;
}

function renderSkeletons(container, count = 4){
  container.innerHTML = Array(count).fill(skeletonCard()).join("");
}

function renderProducts(container, products){
  container.innerHTML = products.map((p, i) => `
    <div class="pc" onclick="oM(${i})">
      <div class="pi"><img src="${p.imgs[0]}" loading="lazy"></div>
      <div class="pn">
        <div class="nm">${p.nm}</div>
        <div class="ds">${p.ds}</div>
        <div class="pr"><span class="cx">${p.mx}</span><span class="pw">${p.pw}</span><span class="sv">${p.sv}</span></div>
        <button class="vb">View Product</button>
      </div>
    </div>`).join("");

  // Keep the global P array in sync so your existing modal (oM) still works
  window.P = products;
}

async function loadProducts(){
  const container = document.querySelector(".pg");
  if(!container) return;

  // 1. Instant paint from cache (if this isn't the first visit)
  const cached = localStorage.getItem(CACHE_KEY);
  if(cached){
    try{
      renderProducts(container, JSON.parse(cached));
    }catch(e){
      renderSkeletons(container);
    }
  }else{
    renderSkeletons(container);
  }

  // 2. Always fetch fresh data in background and update silently
  try{
    const res = await fetch(PRODUCTS_URL);
    const fresh = await res.json();
    renderProducts(container, fresh);
    localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
  }catch(e){
    console.warn("Could not refresh products — showing cached/skeleton version", e);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
