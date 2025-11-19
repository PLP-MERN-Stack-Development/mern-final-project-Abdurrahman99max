// Server/src/routes/reportRoutes.js

const express = require("express");
const router = express.Router();

// ✅ IMPORTANT: authMiddleware must export the function directly:
// module.exports = auth;
const auth = require("../middleware/authMiddleware");

// Controller
const {
  getReportsSummary,
} = require("../controllers/reportController");

// GET /api/reports/summary
router.get("/summary", auth, getReportsSummary);

module.exports = router;
