// Server/src/routes/saleRoutes.js
const express = require("express");
const { protect } = require("../middleware/auth");
const { getSales, createSale } = require("../controllers/saleController");

const router = express.Router();

router.get("/", protect, getSales);
router.post("/", protect, createSale);

module.exports = router;
