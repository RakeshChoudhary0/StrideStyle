export default function calculateDiscount(
  price: string | number,
  discount: string | number | undefined,
): number {
  const cleanPriceString = String(price).replace(/[^0-9.]/g, "");
  const numericPrice = parseFloat(cleanPriceString);
  const cleanDiscountString = String(discount ?? "0").replace(/[^0-9.]/g, "");
  const numericDiscount = parseFloat(cleanDiscountString);
  if (isNaN(numericPrice) || numericPrice <= 0) return 0;
  if (isNaN(numericDiscount) || numericDiscount <= 0)
    return Math.round(numericPrice);
  if (numericDiscount >= 100) return 0;
  const finalPrice = numericPrice - numericPrice * (numericDiscount / 100);
  return Math.round(finalPrice);
}
