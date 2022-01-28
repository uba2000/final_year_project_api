const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    get: (num) => (num / 100).toFixed(2),
    set: (num) => num * 100,
  },
  level: {
    type: String,
    required: true,
  },
  createdAt: String,
});

const Payment = mongoose.model('Payment', schema)


exports.Payment = Payment