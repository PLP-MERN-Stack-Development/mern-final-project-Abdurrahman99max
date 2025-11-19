// Client/src/pages/SalesPage.jsx

import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import apiClient from "../services/apiClient";

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadSales() {
      try {
        setLoading(true);
        setError("");

        const res = await apiClient.get("/sales");
        const data = res?.data?.sales || [];

        if (mounted) {
          setSales(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Load sales error:", err);
        if (mounted) setError("Failed to load sales.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSales();
    return () => (mounted = false);
  }, []);

  const safeSales = Array.isArray(sales) ? sales : [];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Sales</h1>
          <p className="text-sm text-slate-400">
            View recent transactions.
          </p>
        </div>

        {loading ? (
          <Loader message="Loading sales..." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 p-2">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="border-b border-slate-700 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>

              <tbody>
                {safeSales.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-xs text-slate-500">
                      No sales recorded yet.
                    </td>
                  </tr>
                )}

                {safeSales.map((s) => (
                  <tr key={s._id} className="border-t border-slate-800">
                    <td className="px-4 py-2 text-xs text-slate-400">
                      {s.date ? new Date(s.date).toLocaleString() : "—"}
                    </td>

                    <td className="px-4 py-2">{s.product?.name || s.productName || "-"}</td>

                    <td className="px-4 py-2">{s.qty ?? s.quantity ?? 0}</td>

                    <td className="px-4 py-2 text-emerald-300">
                      ₦{s.totalAmount ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {error && <p className="text-xs text-red-300">{error}</p>}
      </div>
    </Layout>
  );
}

export default SalesPage;
