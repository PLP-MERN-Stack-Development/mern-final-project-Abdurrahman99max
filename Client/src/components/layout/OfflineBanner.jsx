// Client/src/components/layout/OfflineBanner.jsx
import React from "react";

function OfflineBanner() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950 px-8 py-10 lg:px-10 lg:py-12 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/70 px-4 py-2 border border-slate-700/70">
          <div className="h-9 w-9 rounded-full bg-sky-400/90 flex items-center justify-center text-slate-950 font-bold text-lg">
            MB
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              MicroBiz
            </span>
            <span className="text-[11px] text-slate-300">
              Offline-first inventory &amp; sales
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-50">
            Track inventory like a modern business.
          </h1>
          <p className="text-sm lg:text-base text-slate-300 max-w-xl">
            MicroBiz helps small shops and multi-branch businesses track stock,
            sales, and revenue — even with shaky internet.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 text-xs">
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Daily sales
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-50">
              ₦245,800
            </p>
            <p className="mt-1 text-[11px] text-emerald-400">
              +18.4% vs yesterday
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Low stock items
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-50">7</p>
            <p className="mt-1 text-[11px] text-amber-300">
              restock recommended
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Sync health
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-50">99.2%</p>
            <p className="mt-1 text-[11px] text-sky-300">no data loss</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-[11px] text-slate-400">
        <div className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Live stores synced</span>
        </div>
        <span>Revenue last 7 days · Auto-updating</span>
      </div>
    </div>
  );
}

export default OfflineBanner;
