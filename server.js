// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Storage configuration for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Product model
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
});
const Product = mongoose.model('Product', ProductSchema);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.post('/products', upload.single('image'), async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file.path;

    try {
        const product = new Product({ name, price, description, image });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// server.js
// Add this after existing routes
app.get('/api/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
      const { pincode, name, village, city, contactNumber, cart, totalAmount } = req.body;

      // Create a new order
      const newOrder = new Order({
          pincode,
          name,
          village,
          city,
          contactNumber,
          cart,
          totalAmount
      });

      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
      const orders = await Order.find();
      res.json(orders);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (order) {
          order.status = req.body.status || order.status;
          await order.save();
          res.json({ message: 'Order updated successfully' });
      } else {
          res.status(404).json({ message: 'Order not found' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get order by ID (optional, if needed for more details)
app.get('/:id', async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (order) {
          res.json(order);
      } else {
          res.status(404).json({ message: 'Order not found' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
