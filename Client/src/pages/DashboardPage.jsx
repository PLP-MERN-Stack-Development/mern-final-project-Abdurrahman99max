// Client/src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import apiClient from "../services/apiClient";
import { formatCurrency } from "../utils/currency";

const EMPTY_METRICS = {
  totalSalesCount: 0,
  totalSalesAmount: 0,
  productCount: 0,
  lowStockCount: 0,
  recentSales: [],
  salesTrend: [], // optional, for future chart
};

function DashboardPage() {
  const [metrics, setMetrics] = useState(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadMetrics() {
      try {
        setLoading(true);
        setError("");
        const data = await apiClient.getDashboardMetrics();

        if (!mounted) return;

        setMetrics({
          totalSalesCount: data?.totalSalesCount ?? 0,
          totalSalesAmount: data?.totalSalesAmount ?? 0,
          productCount: data?.productCount ?? 0,
          lowStockCount: data?.lowStockCount ?? 0,
          recentSales: Array.isArray(data?.recentSales) ? data.recentSales : [],
          salesTrend: Array.isArray(data?.salesTrend) ? data.salesTrend : [],
        });
      } catch (err) {
        console.error("Load dashboard metrics error:", err);
        if (mounted) {
          setError("Failed to load dashboard metrics.");
          setMetrics(EMPTY_METRICS);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadMetrics();
    return () => {
      mounted = false;
    };
  }, []);

  const {
    totalSalesCount,
    totalSalesAmount,
    productCount,
    lowStockCount,
    recentSales,
  } = metrics;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">
            Inventory &amp; Sales Overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            See your stock health, sales performance, and recent activity at a glance.
          </p>
        </div>

        {loading ? (
          <Loader message="Loading dashboard metrics..." />
        ) : (
          <>
            {error && (
              <p className="text-xs text-red-300 mb-2">{error}</p>
            )}

            {/* Stat cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Total Sales
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {formatCurrency(totalSalesAmount)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {totalSalesCount} sales recorded
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Products
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {productCount}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Active products in your catalog
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Low stock
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {lowStockCount}
                </p>
                <p className="mt-1 text-xs text-slate-500">Below 5 units</p>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Recent sales
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {recentSales.length}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Last {recentSales.length || 0} transactions
                </p>
              </div>
            </div>

            {/* Recent sales list */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40">
                <h2 className="text-sm font-semibold text-slate-100">
                  Recent Activity
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Latest recorded sales and amounts.
                </p>

                <div className="mt-4 space-y-2">
                  {recentSales.length === 0 && (
                    <p className="text-xs text-slate-500">
                      No sales activity yet. Record your first sale from the{" "}
                      <span className="font-semibold text-slate-200">Sales</span>{" "}
                      section.
                    </p>
                  )}

                  {recentSales.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-2 text-xs"
                    >
                      <div>
                        <p className="font-medium text-slate-100">
                          {s.productName || "Sale"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {s.date
                            ? new Date(s.date).toLocaleString()
                            : "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-300">
                          {formatCurrency(s.totalAmount ?? 0)}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Qty: {s.quantity ?? 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placeholder for future chart / trend */}
              <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/40 p-4 text-xs text-slate-500">
                <p className="font-semibold text-slate-200">
                  Sales Trend (coming soon)
                </p>
                <p className="mt-1">
                  You can later plug in a chart (Recharts, Chart.js, etc.) using
                  the <code>salesTrend</code> data returned from the API.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default DashboardPage;
