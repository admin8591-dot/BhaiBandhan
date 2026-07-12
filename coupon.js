const TIERS = [
  { minAmount: 1000, type: "flat", value: 70, freeDelivery: true },
  { minAmount: 500,  type: "flat", value: 50, freeDelivery: true },
  { minAmount: 299,  type: "none", value: 0,  freeDelivery: true },
  { minAmount: 0,    type: "none", value: 0,  freeDelivery: false }
];

const DELIVERY_CHARGE = 40;

function calculateOrder(cartTotal, tiers = TIERS) {
  const sorted = [...tiers].sort((a, b) => b.minAmount - a.minAmount);
  const tier = sorted.find(t => cartTotal >= t.minAmount) || sorted[sorted.length - 1];

  let discount = 0;
  if (tier.type === "flat") {
    discount = tier.value;
  } else if (tier.type === "percent") {
    discount = Math.round(cartTotal * (tier.value / 100));
  }
  discount = Math.min(discount, cartTotal);

  const deliveryCharge = tier.freeDelivery ? 0 : DELIVERY_CHARGE;
  const finalTotal = cartTotal - discount + deliveryCharge;

  return { discount, deliveryCharge, finalTotal };
}
