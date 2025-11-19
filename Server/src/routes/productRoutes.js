// Server/src/routes/productRoutes.js
const express = require("express");
const { protect } = require("../middleware/auth");
const { getProducts, createProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", protect, getProducts);
router.post("/", protect, createProduct);

module.exports = router;
