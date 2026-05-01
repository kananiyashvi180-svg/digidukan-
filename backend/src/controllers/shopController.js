const Shop = require('../models/Shop');
const User = require('../models/User');
const Product = require('../models/Product');
const aiService = require('../services/aiService');
const slugify = require('slugify');

exports.getAnalyticsAdmin = async (req, res) => {
  try {
    const totalShops = await Shop.countDocuments();
    const liveShops = await Shop.countDocuments({ status: 'LIVE' });
    const pendingShops = await Shop.countDocuments({ status: 'PENDING' });
    const rejectedShops = await Shop.countDocuments({ status: 'REJECTED' });
    const totalUsers = await User.countDocuments({ role: 'SHOPKEEPER' });
    const totalProducts = await Product.countDocuments();

    // Group shops by category
    const categoryStats = await Shop.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Recent growth (simulated for now, could use timestamps)
    const recentShops = await Shop.find().sort('-createdAt').limit(5).populate('owner', 'name');

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalShops,
          liveShops,
          pendingShops,
          rejectedShops,
          totalUsers,
          totalProducts
        },
        categoryStats,
        recentShops
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.generateShop = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ status: 'fail', message: 'Text description is required' });
    }

    const aiData = await aiService.parseShopDetails(text);
    
    // Generate slug from store name
    const slug = slugify(aiData.storeName || 'my-shop', { lower: true, strict: true }) + '-' + Math.random().toString(36).substring(7);

    res.status(200).json({
      status: 'success',
      data: {
        ...aiData,
        slug
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.createShop = async (req, res) => {
  try {
    const { name, slug, description, category, tagline, theme, phone, address, hours, color, products } = req.body;

    const shop = await Shop.create({
      owner: req.user._id,
      name,
      slug,
      description,
      category,
      tagline,
      theme,
      phone,
      address,
      hours,
      color,
      status: 'PENDING'
    });

    // Create products if any
    if (products && Array.isArray(products)) {
      const productPromises = products.map(p => 
        Product.create({
          shop: shop._id,
          name: typeof p === 'string' ? p : p.name,
          price: p.price || 0,
          category: p.category || category
        })
      );
      await Promise.all(productPromises);
    }

    // Notify handlers via socket
    const io = req.app.get('io');
    if (io) {
      io.emit('newShopRequest', { shopId: shop._id, name: shop.name });
    }

    res.status(201).json({
      status: 'success',
      data: {
        shop
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ owner: req.user._id });
    res.status(200).json({
      status: 'success',
      data: {
        shops
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getShopBySlug = async (req, res) => {
  try {
    const shop = await Shop.findOne({ slug: req.params.slug }).populate('owner', 'name');
    if (!shop) {
      return res.status(404).json({ status: 'fail', message: 'Shop not found' });
    }

    const products = await Product.find({ shop: shop._id });

    res.status(200).json({
      status: 'success',
      data: {
        shop,
        products
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getAllShopsAdmin = async (req, res) => {
  try {
    const shops = await Shop.find().populate('owner', 'name email');
    res.status(200).json({
      status: 'success',
      data: {
        shops
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateShopStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const shop = await Shop.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!shop) {
      return res.status(404).json({ status: 'fail', message: 'Shop not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        shop
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
