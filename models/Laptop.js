const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  description: String,
});

module.exports = mongoose.model('Laptop', laptopSchema);
