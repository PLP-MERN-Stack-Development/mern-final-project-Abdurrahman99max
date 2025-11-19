// Server/src/controllers/metricsController.js
const Product = require("../models/Product");
const Sale = require("../models/Sale");

// Helper: get start-of-day for a date
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Helper: label like "11-17"
function formatLabel(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

/**
 * GET /api/metrics/overview
 * Returns overall metrics for the dashboard:
 * - totals: { totalSalesAmount, totalSalesCount, productCount, lowStockCount }
 * - recentSales: last 5 sales
 * - salesTrend: last 7 days daily totals
 */
const getMetricsOverview = async (req, res, next) => {
  try {
    const ownerId = req.user._id;

    // Get all products & sales for this owner
    const [products, sales] = await Promise.all([
      Product.find({ owner: ownerId }).lean(),
      Sale.find({ owner: ownerId }).sort({ date: -1 }).lean(),
    ]);

    // ----- Totals -----
    const totalSalesAmount = sales.reduce(
      (sum, s) => sum + (Number(s.totalAmount) || 0),
      0
    );
    const totalSalesCount = sales.length;
    const productCount = products.length;
    const lowStockCount = products.filter(
      (p) => typeof p.quantity === "number" && p.quantity > 0 && p.quantity <= (p.lowStockThreshold || 5)
    ).length;

    const totals = {
      totalSalesAmount,
      totalSalesCount,
      productCount,
      lowStockCount,
    };

    // ----- Recent sales (last 5) -----
    const recentSales = sales.slice(0, 5).map((s) => ({
      id: s._id,
      productName: s.productName,
      quantity: s.quantity,
      totalAmount: s.totalAmount,
      date: s.date,
    }));

    // ----- Sales trend: last 7 days -----
    const today = startOfDay(new Date());
    const days = [];

    for (let offset = 6; offset >= 0; offset--) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() - offset);
      days.push(startOfDay(dayDate).getTime());
    }

    const trendMap = new Map(); // key: startOfDay timestamp, value: totalAmt

    for (const s of sales) {
      if (!s.date) continue;
      const dayKey = startOfDay(s.date).getTime();
      const prev = trendMap.get(dayKey) || 0;
      trendMap.set(dayKey, prev + (Number(s.totalAmount) || 0));
    }

    const salesTrend = days.map((ts) => ({
      date: formatLabel(ts),
      totalAmount: trendMap.get(ts) || 0,
    }));

    return res.json({
      totals,
      recentSales,
      salesTrend,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMetricsOverview,
};
