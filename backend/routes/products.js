const express = require('express');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    
    // TODO: Implement database query for products
    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: {
        products: [],
        total: 0,
        platformInfo: {
          feePercentage: platformFeePercentage,
          message: `All sales on Sideline Pinas are subject to a ${platformFeePercentage}% platform commission`
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message
    });
  }
});

// Get product by ID
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    
    // TODO: Implement database query for single product
    res.json({
      success: true,
      data: {
        id: productId,
        title: 'Sample Product',
        description: 'A digital product by a talented Sideline',
        price: 100,
        sellerId: 'sample-seller-id',
        platformFeePercentage,
        estimatedEarnings: 100 - (100 * platformFeePercentage / 100),
        createdAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product',
      error: error.message
    });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { title, description, price, category, sellerId } = req.body;
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    
    // Calculate estimated earnings for the Sideline
    const platformCommission = (price * platformFeePercentage) / 100;
    const estimatedEarnings = price - platformCommission;
    
    // TODO: Implement product creation in database
    res.json({
      success: true,
      message: 'Product created successfully on Sideline Pinas!',
      data: {
        id: 'new-product-id',
        title,
        description,
        price,
        category,
        sellerId,
        platformFeePercentage,
        platformCommission,
        estimatedEarnings,
        createdAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// Update product
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    
    // Recalculate earnings if price is updated
    if (updates.price) {
      const platformCommission = (updates.price * platformFeePercentage) / 100;
      updates.estimatedEarnings = updates.price - platformCommission;
    }
    
    // TODO: Implement product update in database
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        id: productId,
        ...updates,
        platformFeePercentage,
        updatedAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// Delete product
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    // TODO: Implement product deletion from database
    res.json({
      success: true,
      message: 'Product deleted successfully from Sideline Pinas'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

// Get products by Sideline (seller)
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    
    // TODO: Implement database query for seller's products
    res.json({
      success: true,
      message: 'Sideline products retrieved successfully',
      data: {
        products: [],
        total: 0,
        sellerId,
        platformFeePercentage,
        totalEstimatedEarnings: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Sideline products',
      error: error.message
    });
  }
});

module.exports = router;
