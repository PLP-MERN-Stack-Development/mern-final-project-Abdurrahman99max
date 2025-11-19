// Server/src/controllers/productController.js
const Product = require("../models/Product");

async function getProducts(req, res, next) {
  try {
    const ownerId = req.user._id;

    const products = await Product.find({ owner: ownerId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const ownerId = req.user._id;
    const { name, sku, category, quantity, unitPrice } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Product name is required");
    }

    const product = await Product.create({
      owner: ownerId,
      name: name.trim(),
      sku: (sku || "").trim(),
      category: (category || "").trim(),
      quantity: Number(quantity) || 0,
      unitPrice: Number(unitPrice) || 0,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProducts, createProduct };
