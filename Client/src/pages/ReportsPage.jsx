// Client/src/pages/ReportsPage.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import reportService from "../services/reportService";
import { formatCurrency } from "../utils/currency";

function ReportsPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadReports() {
      try {
        setLoading(true);
        setError("");
        const data = await reportService.getBasicSummary();
        if (!mounted) return;
        setSummary(data);
      } catch (err) {
        console.error("Load reports summary error:", err);
        if (mounted) setError("Failed to load reports.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadReports();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            High-level summaries you can later extend with exports and advanced analytics.
          </p>
        </div>

        {loading ? (
          <Loader message="Loading reports..." />
        ) : error ? (
          <p className="text-xs text-red-300">{error}</p>
        ) : !summary ? (
          <p className="text-xs text-slate-500">No data yet.</p>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Total Revenue
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {formatCurrency(summary.totalRevenue ?? 0)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Total Sales
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {summary.totalSalesCount ?? 0}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Active Products
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {summary.productCount ?? 0}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 text-xs text-slate-300 shadow-lg shadow-black/40">
              <p className="font-semibold text-sm text-slate-100 mb-2">
                What you can extend later
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Sales by product / category</li>
                <li>Profit and loss summaries</li>
                <li>Low stock and reorder reports</li>
                <li>Export to CSV / Excel</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default ReportsPage;
