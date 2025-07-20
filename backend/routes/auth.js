const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // TODO: Implement user registration with database
    // Check if user already exists
    // Hash password
    // Create user in database
    
    res.json({
      success: true,
      message: 'Sideline Pinas registration successful! Welcome to our community of Sideliners!',
      data: {
        userType: userType || 'sideline', // Default to sideline (content creator)
        email,
        username
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

    // TODO: Implement user login with database
    // Find user by email
    // Verify password
    // Generate JWT token
    
    const token = jwt.sign(
      { userId: 'sample-user-id', email },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful! Welcome back to Sideline Pinas!',
      data: {
        token,
        user: {
          email,
          userType: 'sideline'
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
