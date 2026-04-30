const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'RESOLVED'],
    default: 'PENDING'
  }
}, {
  timestamps: true
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
