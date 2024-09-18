const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Can be 'Pending' or 'Delivered'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
