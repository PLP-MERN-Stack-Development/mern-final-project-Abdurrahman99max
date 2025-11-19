const express = require('express');
const { getMyStores, createStore } = require('../controllers/storeController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes here require auth
router.use(auth);

// GET /api/stores
router.get('/', getMyStores);

// POST /api/stores
router.post('/', createStore);

module.exports = router;
