// Server/src/routes/metricsRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Make sure this path matches your actual middleware file.
// From your tree: Server/src/middleware/authMiddleware.js
const auth = require("../middleware/authMiddleware");

// Import the controller we just defined
const { getMetricsOverview } = require("../controllers/metricsController");

// GET /api/metrics/overview
router.get("/overview", auth, getMetricsOverview);

module.exports = router;
