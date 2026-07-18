"use client";

import React, { useState } from "react";
import { Product, Parent, ProductType } from "@/Features/Shop/Data/ProductData";
import { CartItemRow } from "@/Features/Cart/Components/CartItemRow";
import { OrderSummary } from "@/Features/Cart/Components/OrderSummary";
import { EmptyCart } from "@/Features/Cart/Components/EmptyCart";

interface CartItem {
  product: ProductType;
  selectedSize: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { product: Product[0], selectedSize: "M", quantity: 1 },
    { product: Product[4], selectedSize: "L", quantity: 2 },
  ]);
  const [couponPercentage, setCouponPercentage] = useState<number>(0);

  const updateQuantity = (index: number, change: number) => {
    setCart((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const currentStockItem = item.product.stock.find(
          (s) => s.size === item.selectedSize,
        );
        const maxStock = currentStockItem ? currentStockItem.stock : 10;
        return {
          ...item,
          quantity: Math.max(1, Math.min(item.quantity + change, maxStock)),
        };
      }),
    );
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.basePrice * item.quantity,
    0,
  );
  const totalDiscount = cart.reduce(
    (acc, item) =>
      acc + (item.product.basePrice - item.product.salePrice) * item.quantity,
    0,
  );
  const finalPrice = subtotal - totalDiscount;

  const deliveryFee = finalPrice > 0 ? 149 : 0;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-36 md:pb-24">
        <div className="border-b border-zinc-200/80 pb-5 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-lg md:text-xl font-black uppercase tracking-widest text-zinc-900">
            Shopping Bag
          </h1>
          <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase font-bold">
            YOUR SELECTIONS &mdash; [{totalItems} UNITS]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 xl:col-span-8 space-y-4">
            {cart.map((item, index) => (
              <CartItemRow
                key={`${item.product._id}-${item.selectedSize}`}
                product={item.product}
                selectedSize={item.selectedSize}
                quantity={item.quantity}
                parentInfo={Parent.find((p) => p._id === item.product.parent)}
                onUpdateQuantity={(change) => updateQuantity(index, change)}
                onRemove={() => removeItem(index)}
              />
            ))}
          </section>

          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <OrderSummary
              subtotal={subtotal}
              totalDiscount={totalDiscount}
              deliveryFee={deliveryFee}
              couponPercentage={couponPercentage}
              onCouponApply={setCouponPercentage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
