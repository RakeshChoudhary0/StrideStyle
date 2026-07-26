import React from "react";
import { Bell, CreditCard } from "lucide-react";

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900">
          Account Settings
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Preferences and payment setup.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 shadow-xs">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-100 rounded-xl text-stone-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-stone-800">
                Email Updates
              </h4>
              <p className="text-xs text-stone-500">
                Order updates and promotional offers
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="accent-[#8b4513] w-4 h-4 cursor-pointer"
          />
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-100 rounded-xl text-stone-600">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-stone-800">
                Payment Methods
              </h4>
              <p className="text-xs text-stone-500">
                Manage linked credit cards or UPI options
              </p>
            </div>
          </div>
          <button className="text-xs font-medium text-[#8b4513] hover:underline cursor-pointer">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
