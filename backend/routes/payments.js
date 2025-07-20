const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Payment processing with 10% platform commission
router.post('/process-payment', async (req, res) => {
  try {
    const { 
      productId, 
      sellerId, 
      buyerId, 
      amount, 
      paymentMethod, 
      transactionId 
    } = req.body;

    // Calculate platform commission (10%)
    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    const paymentProcessingFee = parseFloat(process.env.PAYMENT_PROCESSING_FEE) || 2.5;
    
    const platformCommission = (amount * platformFeePercentage) / 100;
    const processingFee = (amount * paymentProcessingFee) / 100;
    const sellerAmount = amount - platformCommission - processingFee;

    // Create payment record
    const paymentRecord = {
      productId,
      sellerId,
      buyerId,
      originalAmount: amount,
      platformCommission,
      processingFee,
      sellerAmount,
      paymentMethod,
      transactionId,
      status: 'completed',
      createdAt: new Date()
    };

    // TODO: Save to database
    // await Payment.create(paymentRecord);

    // TODO: Update product status as sold
    // await Product.findByIdAndUpdate(productId, { status: 'sold' });

    // TODO: Create transaction record for seller
    // await Transaction.create({
    //   userId: sellerId,
    //   type: 'sale',
    //   amount: sellerAmount,
    //   status: 'completed',
    //   productId
    // });

    // TODO: Create transaction record for platform
    // await Transaction.create({
    //   userId: 'platform',
    //   type: 'commission',
    //   amount: platformCommission,
    //   status: 'completed',
    //   productId
    // });

    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        transactionId,
        originalAmount: amount,
        platformCommission: platformCommission,
        processingFee: processingFee,
        sellerAmount: sellerAmount,
        platformFeePercentage: platformFeePercentage
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: error.message
    });
  }
});

// Get platform fee information
router.get('/platform-fee', (req, res) => {
  const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
  const paymentProcessingFee = parseFloat(process.env.PAYMENT_PROCESSING_FEE) || 2.5;
  
  res.json({
    success: true,
    data: {
      platformFeePercentage,
      paymentProcessingFee,
      description: `Sideline Pinas charges a ${platformFeePercentage}% commission on all successful transactions to maintain and improve our platform for all Sideliners.`
    }
  });
});

// Calculate fees for a given amount
router.post('/calculate-fees', (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
    const paymentProcessingFee = parseFloat(process.env.PAYMENT_PROCESSING_FEE) || 2.5;
    
    const platformCommission = (amount * platformFeePercentage) / 100;
    const processingFee = (amount * paymentProcessingFee) / 100;
    const sellerAmount = amount - platformCommission - processingFee;
    const totalFees = platformCommission + processingFee;

    res.json({
      success: true,
      data: {
        originalAmount: amount,
        platformCommission: Math.round(platformCommission * 100) / 100,
        processingFee: Math.round(processingFee * 100) / 100,
        totalFees: Math.round(totalFees * 100) / 100,
        sellerAmount: Math.round(sellerAmount * 100) / 100,
        platformFeePercentage,
        paymentProcessingFee,
        breakdown: {
          seller: `₱${Math.round(sellerAmount * 100) / 100}`,
          platform: `₱${Math.round(platformCommission * 100) / 100}`,
          processing: `₱${Math.round(processingFee * 100) / 100}`
        }
      }
    });

  } catch (error) {
    console.error('Fee calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Fee calculation failed',
      error: error.message
    });
  }
});

// Get transaction history with commission breakdown
router.get('/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // TODO: Implement transaction history retrieval
    // const transactions = await Transaction.find({ userId }).populate('productId');
    
    res.json({
      success: true,
      data: {
        transactions: [],
        summary: {
          totalSales: 0,
          totalCommissionPaid: 0,
          totalEarnings: 0,
          platformFeePercentage: parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10
        }
      }
    });

  } catch (error) {
    console.error('Transaction history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transaction history',
      error: error.message
    });
  }
});

module.exports = router;
