// Server/src/scripts/seedDemoData.js

require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

// helper
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(12, 0, 0, 0);
  return d;
}

// compute total
function computeTotal(product, qty) {
  const unit = Number(product.unitPrice || 0);
  if (isNaN(unit)) return 0;
  return qty * unit;
}

async function seed() {
  console.log("🔌 Connecting to MongoDB...");
  await connectDB();
  console.log("✅ Connected");

  const DEMO_EMAIL = "test@example.com";

  let user = await User.findOne({ email: DEMO_EMAIL });

  if (!user) {
    console.error(`❌ User with email ${DEMO_EMAIL} not found.`);
    process.exit(1);
  }

  console.log(`👤 Using user: ${user.email}`);

  // clear old data
  await Product.deleteMany({ owner: user._id });
  await Sale.deleteMany({ owner: user._id });

  console.log("📦 Creating demo products...");

  const products = await Product.insertMany([
    { name: "Premium Rice (50kg)", sku: "RICE-50", category: "Grains", quantity: 40, unitPrice: 32000, owner: user._id },
    { name: "Vegetable Oil (25L)", sku: "OIL-25", category: "Oil", quantity: 25, unitPrice: 28000, owner: user._id },
    { name: "Soft Drinks Crate", sku: "SD-CRATE", category: "Drinks", quantity: 60, unitPrice: 2500, owner: user._id },
    { name: "Noodles Carton", sku: "NDL-CTN", category: "Food", quantity: 75, unitPrice: 4200, owner: user._id },
    { name: "Laundry Soap Pack", sku: "SOAP-PK", category: "Household", quantity: 30, unitPrice: 1800, owner: user._id },
  ]);

  console.log("💰 Creating demo sales...");

  const salesDocs = [
    { product: products[0]._id, qty: 2, totalAmount: computeTotal(products[0], 2), date: daysAgo(1), owner: user._id },
    { product: products[1]._id, qty: 3, totalAmount: computeTotal(products[1], 3), date: daysAgo(2), owner: user._id },
    { product: products[2]._id, qty: 5, totalAmount: computeTotal(products[2], 5), date: daysAgo(3), owner: user._id },
    { product: products[3]._id, qty: 4, totalAmount: computeTotal(products[3], 4), date: daysAgo(4), owner: user._id },
    { product: products[4]._id, qty: 6, totalAmount: computeTotal(products[4], 6), date: daysAgo(5), owner: user._id },
    { product: products[0]._id, qty: 1, totalAmount: computeTotal(products[0], 1), date: daysAgo(0), owner: user._id },
    { product: products[2]._id, qty: 8, totalAmount: computeTotal(products[2], 8), date: daysAgo(6), owner: user._id },
  ];

  await Sale.insertMany(salesDocs);

  console.log("✅ Demo seed complete!");
  await mongoose.connection.close();
  console.log("🔌 Disconnected.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.connection.close().then(() => process.exit(1));
});
