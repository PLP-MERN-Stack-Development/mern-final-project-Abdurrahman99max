const Store = require('../models/Store');

// GET /api/stores
// Get all stores for current user (multi-store ready)
const getMyStores = async (req, res, next) => {
  try {
    const stores = await Store.find({ owner: req.user._id, isActive: true });
    res.json(stores);
  } catch (err) {
    next(err);
  }
};

// POST /api/stores
// Create an additional store (for multi-store)
const createStore = async (req, res, next) => {
  try {
    const { name, currency, address } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Store name is required' });
    }

    const store = await Store.create({
      owner: req.user._id,
      name,
      currency: currency || 'NGN',
      address
    });

    res.status(201).json(store);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyStores,
  createStore
};
