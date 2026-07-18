"use client";

import React, { useState } from "react";
import { ArrowRight, Shield, Ticket, X } from "lucide-react";

// Mocking specific coupon codes with custom reduction percentages
const AVAILABLE_COUPONS: Record<string, number> = {
  STREET20: 20, // 20% Off
  STRIDE10: 10, // 10% Off
  SEASONFIRST: 5, // 5% Off
};

interface OrderSummaryProps {
  subtotal: number;
  totalDiscount: number;
  deliveryFee: number;
  onCouponApply: (percentage: number) => void;
  couponPercentage: number;
}

export const OrderSummary = ({
  subtotal,
  totalDiscount,
  deliveryFee,
  onCouponApply,
  couponPercentage,
}: OrderSummaryProps) => {
  const [couponInput, setCouponInput] = useState("");
  const [error, setError] = useState("");
  const [activeCode, setActiveCode] = useState("");

  const finalPriceBeforeCoupon = subtotal - totalDiscount;

  // Calculate specific value reduced by the active coupon percentage
  const couponAmount = Math.round(
    finalPriceBeforeCoupon * (couponPercentage / 100),
  );
  const grandTotal = finalPriceBeforeCoupon - couponAmount + deliveryFee;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (AVAILABLE_COUPONS[code] !== undefined) {
      onCouponApply(AVAILABLE_COUPONS[code]);
      setActiveCode(code);
      setCouponInput("");
    } else {
      setError("Invalid coupon code");
    }
  };

  const handleRemove = () => {
    onCouponApply(0);
    setActiveCode("");
    setError("");
  };

  return (
    <section className="bg-white border border-zinc-200/80 p-6 sticky top-24 rounded-sm shadow-[0_10px_30px_rgb(0,0,0,0.01)] space-y-5">
      <div>
        <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-900 border-b border-zinc-100 pb-3.5 flex justify-between items-center">
          <span>Order Summary</span>
          <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full animate-ping" />
        </h2>
      </div>

      {/* Coupon Form Input Field */}
      {!activeCode ? (
        <form onSubmit={handleApply} className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
            Have a promo code?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="E.G. STREET20"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="w-full text-xs uppercase font-mono tracking-wider pl-8 pr-3 py-2.5 border border-zinc-200 bg-zinc-50/50 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white transition-all duration-200"
              />
              <Ticket className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] uppercase tracking-wider font-bold px-4 rounded-sm transition-colors duration-200"
            >
              Apply
            </button>
          </div>
          {error && (
            <p className="text-[11px] text-red-600 font-medium">{error}</p>
          )}
        </form>
      ) : (
        /* Active Coupon Status Badge */
        <div className="bg-zinc-50 border border-zinc-900/10 px-3 py-2.5 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-xs font-bold font-mono tracking-wider text-zinc-900">
                {activeCode} Applied
              </p>
              <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wide">
                Extra {couponPercentage}% off your bag
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-zinc-400 hover:text-zinc-900 p-1 transition-colors"
            aria-label="Remove coupon"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Financial Breakdown Ledger */}
      <div className="space-y-3.5 text-xs text-zinc-600 font-medium border-t border-zinc-100 pt-3">
        <div className="flex justify-between">
          <span>Cart Subtotal</span>
          <span className="text-zinc-900 font-mono font-bold">₹{subtotal}</span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Promotional Discount</span>
            <span className="font-mono font-bold">- ₹{totalDiscount}</span>
          </div>
        )}

        {couponPercentage > 0 && (
          <div className="flex justify-between text-emerald-600 bg-emerald-50/50 p-1.5 rounded-sm -mx-1">
            <span>Coupon Discount ({couponPercentage}%)</span>
            <span className="font-mono font-bold">- ₹{couponAmount}</span>
          </div>
        )}

        <div className="flex justify-between border-b border-zinc-100 pb-4">
          <span>Shipping Charges</span>
          <span className="font-mono font-bold text-zinc-900">
            ₹{deliveryFee}
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-2 text-zinc-900 font-bold">
          <span className="uppercase text-xs tracking-widest font-extrabold">
            Total Amount
          </span>
          <span className="text-lg font-mono tracking-tight">
            ₹{grandTotal}
          </span>
        </div>
      </div>

      {/* CTA Button Block */}
      <button className="group w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs uppercase tracking-widest font-bold py-4 transition-all duration-300 rounded-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-zinc-900/10 active:scale-[0.99]">
        Proceed to Checkout
        <ArrowRight
          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
          strokeWidth={2.5}
        />
      </button>

      {/* Trust Badges */}
      <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
        <Shield className="w-3 h-3 text-zinc-400" />
        <span>Secure checkout via SSL encryption</span>
      </div>
    </section>
  );
};
