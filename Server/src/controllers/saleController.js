// Server/src/controllers/saleController.js
const Sale = require("../models/Sale");
const Product = require("../models/Product");

async function getSales(req, res, next) {
  try {
    const ownerId = req.user._id;

    const sales = await Sale.find({ owner: ownerId })
      .sort({ date: -1 })
      .limit(100);

    res.json({ success: true, data: sales });
  } catch (err) {
    next(err);
  }
}

async function createSale(req, res, next) {
  try {
    const ownerId = req.user._id;
    const { productId, productName, quantity, unitPrice, date } = req.body;

    const qty = Number(quantity);
    const price = Number(unitPrice);

    if (!productName && !productId) {
      res.status(400);
      throw new Error("Either productId or productName is required");
    }
    if (!qty || qty <= 0) {
      res.status(400);
      throw new Error("Quantity must be > 0");
    }
    if (Number.isNaN(price) || price < 0) {
      res.status(400);
      throw new Error("Unit price must be a non-negative number");
    }

    let finalName = productName;
    let productDoc = null;

    if (productId) {
      productDoc = await Product.findOne({ _id: productId, owner: ownerId });
      if (!productDoc) {
        res.status(400);
        throw new Error("Product not found for this user");
      }
      finalName = productDoc.name;
      // decrease stock (simple)
      productDoc.quantity = (productDoc.quantity || 0) - qty;
      if (productDoc.quantity < 0) productDoc.quantity = 0;
      await productDoc.save();
    }

    const totalAmount = Number((qty * price).toFixed(2));

    const sale = await Sale.create({
      owner: ownerId,
      product: productDoc ? productDoc._id : null,
      productName: finalName,
      quantity: qty,
      unitPrice: price,
      totalAmount,
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json({ success: true, data: sale });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSales, createSale };
