const express = require('express');
const shopController = require('../controllers/shopController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', protect, shopController.generateShop);
router.post('/', protect, shopController.createShop);
router.get('/', protect, shopController.getShops);

// Admin Routes
router.get('/admin/all', protect, restrictTo('HANDLER'), shopController.getAllShopsAdmin);
router.get('/admin/analytics', protect, restrictTo('HANDLER'), shopController.getAnalyticsAdmin);
router.patch('/admin/:id', protect, restrictTo('HANDLER'), shopController.updateShopStatusAdmin);

router.get('/:slug', shopController.getShopBySlug); // Public route

module.exports = router;
