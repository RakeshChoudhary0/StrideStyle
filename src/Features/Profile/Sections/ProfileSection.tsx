import React from "react";
import { Pencil, ShieldCheck } from "lucide-react";
import { UserProfile } from "../types";

export function ProfileSection({ user }: { user: UserProfile }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900">
          Welcome back, {user.name.split(" ")[0]}.
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-stone-800">
                Personal Details
              </h3>
              <button className="flex items-center gap-1.5 text-xs font-medium border border-stone-200 px-3 py-1.5 rounded-full hover:bg-stone-50 transition-colors text-stone-700 cursor-pointer">
                <Pencil className="w-3 h-3" /> Edit
              </button>
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold block mb-0.5">
                Full Name
              </span>
              <p className="text-sm text-stone-800 font-medium">{user.name}</p>
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold block mb-0.5">
                Email
              </span>
              <p className="text-sm text-stone-800 font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold block mb-0.5">
                Shipping Address
              </span>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                {user.address}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-medium text-stone-800">
                Account Security
              </h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Protected
              </span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              Keep your credentials updated to maintain maximum account
              security.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-100">
            <button className="bg-[#8b4513] hover:bg-[#72380f] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
