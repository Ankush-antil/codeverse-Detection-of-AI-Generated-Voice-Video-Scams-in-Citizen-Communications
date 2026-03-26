const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, language } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and mobile are required' 
      });
    }

    const user = new User({ name, mobile, language });
    const savedUser = await user.save();

    console.log('✅ User registered:', savedUser.name, savedUser.mobile);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        mobile: savedUser.mobile,
        language: savedUser.language,
        registeredAt: savedUser.registeredAt,
      },
    });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

module.exports = router;
