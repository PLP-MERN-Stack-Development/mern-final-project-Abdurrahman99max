// Server/src/controllers/reportController.js

const Sale = require("../models/Sale");
const Product = require("../models/Product");

/**
 * GET /api/reports/summary
 * Very simple placeholder summary you can extend later.
 * Requires req.user to be set by auth middleware.
 */
const getReportsSummary = async (req, res, next) => {
  try {
    const ownerId = req.user ? req.user._id : null;

    const match = ownerId ? { owner: ownerId } : {};

    const [totalSalesCount, totalProductsCount] = await Promise.all([
      Sale.countDocuments(match),
      Product.countDocuments(match),
    ]);

    return res.json({
      totalSalesCount,
      totalProductsCount,
      message:
        "Basic reports summary. Extend this later with more detailed analytics.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getReportsSummary,
};
