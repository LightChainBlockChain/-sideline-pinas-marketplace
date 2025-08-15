const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to award early-user incentives
async function maybeAwardEarlyUserIncentives(userDoc) {
  const limit = parseInt(process.env.EARLY_USER_LIMIT || '100', 10);
  const tokenReward = parseFloat(process.env.EARLY_USER_SIGNUP_REWARD_TOKENS || '5');
  const discountRate = parseFloat(process.env.EARLY_USER_DISCOUNT_RATE || '0.2');

  const count = await User.countDocuments();
  if (count <= limit) {
    userDoc.wallet.tokenBalance = (userDoc.wallet.tokenBalance || 0) + tokenReward;
    userDoc.rewards = {
      signupTokensAwarded: tokenReward,
      awardedAt: new Date(),
      reason: `Early user reward (first ${limit} users)`
    };
    userDoc.discount = {
      eligible: true,
      rate: discountRate,
      awardedAt: new Date(),
      expiresAt: null,
    };
  }
}

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'username, email, and password are required' });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User with that email or username already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      role: userType === 'admin' ? 'admin' : 'sideline',
      preferences: { currency: 'PHP', language: 'en' },
    });

    // Award early-user incentives if within limit
    await maybeAwardEarlyUserIncentives(user);

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Sideline Pinas registration successful! Welcome to our community of Sideliners! 🎉',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          wallet: user.wallet,
          discount: user.discount,
          rewards: user.rewards,
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful! Welcome back to Sideline Pinas!',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          discount: user.discount,
          wallet: { tokenBalance: user.wallet.tokenBalance }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get current user
router.get('/me', (req, res) => {
  // TODO: Implement authentication middleware
  res.json({
    success: true,
    data: {
      id: 'sample-user-id',
      email: 'user@example.com',
      userType: 'sideline',
      joinedAt: new Date()
    }
  });
});

module.exports = router;
