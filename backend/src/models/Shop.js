const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: String,
  tagline: String,
  theme: {
    type: String,
    default: 'default'
  },
  status: {
    type: String,
    enum: ['PENDING', 'LIVE', 'REJECTED', 'INACTIVE'],
    default: 'PENDING'
  },
  phone: String,
  address: String,
  hours: String,
  color: String,
  logo: String,
  banner: String,
  upiId: String,
  location: {
    lat: Number,
    lng: Number
  }
}, {
  timestamps: true
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
