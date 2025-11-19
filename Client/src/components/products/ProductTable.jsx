// src/components/products/ProductTable.jsx
import React from "react";

function ProductTable({ products = [] }) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
      <table className="min-w-full text-sm text-slate-200">
        <thead className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Qty</th>
            <th className="px-4 py-3 text-right">Unit price</th>
          </tr>
        </thead>
        <tbody>
          {safeProducts.map((p) => (
            <tr
              key={p._id || p.id}
              className="border-b border-slate-800/60 last:border-none hover:bg-slate-900/80"
            >
              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3 text-slate-400">{p.sku || "—"}</td>
              <td className="px-4 py-3 text-slate-400">{p.category || "—"}</td>
              <td className="px-4 py-3 text-right">{p.quantity ?? 0}</td>
              <td className="px-4 py-3 text-right">
                ₦{Number(p.unitPrice || 0).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
