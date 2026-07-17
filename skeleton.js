// ===== Skeleton Loader Script for BhaiBandhan Rakhi Store =====
// This shows skeleton placeholders while your page/products load,
// then swaps them out for real content automatically.

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");

  // 1. Show skeleton cards immediately (e.g. 6 placeholders)
  if (container) {
    let skeletonHTML = "";
    for (let i = 0; i < 6; i++) {
      skeletonHTML += `
        <div class="skeleton-card">
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
          <div class="skeleton skeleton-text price"></div>
        </div>
      `;
    }
    container.innerHTML = skeletonHTML;
  }

  // 2. Once everything (images etc.) finishes loading, replace with real content
  window.addEventListener("load", () => {
    loadRealProducts();
  });
});

// Replace this function with your actual product-loading logic
// (e.g. fetching from an API, JSON file, or your existing product array)
function loadRealProducts() {
  const container = document.getElementById("product-container");
  if (!container) return;

  // Example: replace with your real product data
  const products = [
    { name: "Golden Rakhi", price: "₹99", img: "images/rakhi1.jpg" },
    { name: "Kids Rakhi Set", price: "₹149", img: "images/rakhi2.jpg" },
    { name: "Silver Thread Rakhi", price: "₹129", img: "images/rakhi3.jpg" },
  ];

  container.innerHTML = products
    .map(
      (p) => `
      <div class="skeleton-card content-loaded">
        <img src="${p.img}" alt="${p.name}" style="width:100%; border-radius:8px;" />
        <p>${p.name}</p>
        <p><strong>${p.price}</strong></p>
      </div>
    `
    )
    .join("");
}
