const express = require('express');
const Area = require('../models/Area');
const router = express.Router();

// Check if pincode is valid
router.post('/validate', async (req, res) => {
  const { pincode } = req.body;
  const area = await Area.findOne({ pincode });
  if (area) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// Add an area (Admin route)
router.post('/add', async (req, res) => {
  const { pincode } = req.body;
  const area = new Area({ pincode });
  await area.save();
  res.status(201).json(area);
});

module.exports = router;
