// Client/src/pages/ProductsPage.jsx

import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";
import apiClient from "../services/apiClient";

const EMPTY_PRODUCT = {
  name: "",
  sku: "",
  category: "",
  quantity: "",
  unitPrice: "",
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setInitialLoading(true);
        setError("");

        const res = await apiClient.get("/products");
        const data = res?.data?.products || [];

        if (mounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Load products error:", err);
        if (mounted) setError("Failed to load products.");
      } finally {
        if (mounted) setInitialLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const safeProducts = Array.isArray(products) ? products : [];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category.trim(),
        quantity: Number(form.quantity) || 0,
        unitPrice: Number(form.unitPrice) || 0,
      };

      const res = await apiClient.post("/products", payload);
      const created = res?.data?.product || res?.data;

      setProducts((prev) => [created, ...prev]);
      setForm(EMPTY_PRODUCT);
    } catch (err) {
      console.error("Create product error:", err);
      setError("Failed to create product. Check your inputs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Products</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your inventory items, prices, and stock levels.
          </p>
        </div>

        <form
          onSubmit={handleAddProduct}
          className="flex flex-wrap gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-black/40"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="min-w-[150px] flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            required
          />

          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="min-w-[120px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="min-w-[120px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          />

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Qty"
            className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          />

          <input
            type="number"
            name="unitPrice"
            value={form.unitPrice}
            onChange={handleChange}
            placeholder="Unit price (₦)"
            className="w-36 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-900"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        {initialLoading ? (
          <Loader message="Loading products..." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 p-2">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="border-b border-slate-700 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Unit price</th>
                </tr>
              </thead>

              <tbody>
                {safeProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-xs text-slate-500">
                      No products yet. Add your first product above.
                    </td>
                  </tr>
                )}

                {safeProducts.map((p) => (
                  <tr key={p._id} className="border-t border-slate-800">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.sku || "-"}</td>
                    <td className="px-4 py-2">{p.category || "-"}</td>
                    <td className="px-4 py-2">{p.quantity ?? 0}</td>
                    <td className="px-4 py-2">₦{p.unitPrice ?? 0}</td>
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

export default ProductsPage;
