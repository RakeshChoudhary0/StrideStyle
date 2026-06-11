"use client";

import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const SubscribeNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");
    setEmail("");
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-tertiary-container flex flex-col justify-center items-center py-20">
      <div className="w-full max-w-4xl mx-auto text-center z-10 flex flex-col justify-between h-full gap-16 md:gap-24">
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-xs font-bold font-mono tracking-[0.2em] uppercase text-on-tertiary-container/80 mb-3 block">
            The Inside Circle
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-on-tertiary-fixed-variant mb-6 max-w-2xl leading-[0.95]">
            Elevate Your <br />
            Everyday Wardrobe
          </h2>

          <p className="max-w-md mx-auto text-sm sm:text-base md:text-lg font-light text-on-surface-variant leading-relaxed mb-10">
            Subscribe to our newsletter for exclusive premium collections, early
            drop access, and seasonal updates.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 text-on-primary font-medium w-full max-w-md mx-auto p-4 rounded-xl bg-secondary border border-secondary-fixed animate-slide-in shadow-sm">
              <CheckCircle2 size={22} />
              <span>Awesome! Check your inbox for updates.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-3"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/60">
                  <Mail size={18} />
                </div>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  placeholder="Enter your email address"
                  className="w-full text-sm md:text-base pl-11 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all disabled:opacity-60 shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 bg-secondary hover:bg-on-secondary-fixed-variant disabled:bg-surface-dim text-on-secondary disabled:text-on-surface-variant text-sm font-medium px-8 py-4 sm:py-0 rounded-xl transition-all whitespace-nowrap active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Join Us
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-[11px] text-on-surface-variant/60 mt-4 tracking-wide font-mono">
            Zero spam. Unsubscribe anytime you want.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-outline-variant/30 text-left max-w-3xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <div className="text-on-tertiary-container mb-1">
              <Zap size={20} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-tertiary-fixed-variant">
              Early Access
            </h4>
            <p className="text-xs text-on-surface-variant/80 font-light leading-relaxed">
              Shop our high-demand limited drops 24 hours before the public
              release.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-on-tertiary-container mb-1">
              <Sparkles size={20} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-tertiary-fixed-variant">
              Member Perks
            </h4>
            <p className="text-xs text-on-surface-variant/80 font-light leading-relaxed">
              Receive hidden seasonal promo codes and secret event invitations.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-on-tertiary-container mb-1">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-tertiary-fixed-variant">
              Curated Content
            </h4>
            <p className="text-xs text-on-surface-variant/80 font-light leading-relaxed">
              No junk mail. Just high-quality outfit styling guides tailored to
              your wardrobe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
