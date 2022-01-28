const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  amountPaid: {
    type: Number,
    get: (num) => (num / 100).toFixed(2),
    set: (num) => num * 100,
  },
  user: {+
    type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User'
},
  paymentFor: {
  required: true,
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Payment'
},
  // paymentType
  createdAt: String,
});

const Transaction = mongoose.model('Transaction', schema)


exports.Transaction = Transaction