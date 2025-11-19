// src/components/common/Loader.jsx
import React from "react";

function Loader({ message = "Loading..." }) {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3 shadow-lg shadow-slate-900/40">
        <div className="h-3 w-3 animate-ping rounded-full bg-emerald-400" />
        <p className="text-sm font-medium text-slate-100">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
