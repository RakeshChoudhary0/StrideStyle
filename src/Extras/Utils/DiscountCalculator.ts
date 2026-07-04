export default function calculateDiscount(price: string, discount: string) {
  const numericPrice = Number(price.replace(/,/g, ""));
  const numericDiscount = Number(discount);
  if (isNaN(numericPrice)) return 0;
  const finalPrice = numericPrice - numericPrice * (numericDiscount / 100);
  return Math.floor(finalPrice);
}
