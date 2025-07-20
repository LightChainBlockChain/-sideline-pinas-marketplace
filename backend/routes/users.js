const express = require('express');
const router = express.Router();

// Get all Sideliners (content creators)
router.get('/sideliners', async (req, res) => {
  try {
    // TODO: Implement database query for Sideliners
    res.json({
      success: true,
      message: 'Sideliners retrieved successfully',
      data: {
        sideliners: [],
        total: 0,
        platformFee: `${process.env.PLATFORM_FEE_PERCENTAGE || 10}%`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Sideliners',
      error: error.message
    });
  }
});

// Get Sideline profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // TODO: Implement database query for user profile
    res.json({
      success: true,
      data: {
        id: userId,
        username: 'sample-sideline',
        email: 'sideline@example.com',
        userType: 'sideline',
        totalSales: 0,
        totalCommissionPaid: 0,
        platformFeePercentage: parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10,
        joinedAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    // TODO: Implement profile update
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: userId,
        ...updates
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Get user's earnings summary
router.get('/earnings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    
    // TODO: Calculate actual earnings from database
    res.json({
      success: true,
      data: {
        totalSales: 0,
        totalCommissionPaid: 0,
        netEarnings: 0,
        platformFeePercentage,
        message: `Sideline Pinas charges ${platformFeePercentage}% commission on successful transactions`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve earnings',
      error: error.message
    });
  }
});

module.exports = router;
