const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/User');

const auth = require('../middleware/auth');

// Protected routes: require JWT
router.use(auth);

// Request faucet tokens for a verified wallet address (if FAUCET_WEBHOOK_URL configured)
router.post('/request', async (req, res) =[0m> {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user || !user.wallet?.verified || !user.wallet?.address) {
      return res.status(400).json({ success: false, message: 'User wallet not linked/verified' });
    }

    const faucetUrl = process.env.FAUCET_WEBHOOK_URL;
    const apiKey = process.env.FAUCET_API_KEY;
    if (!faucetUrl || !apiKey) {
      return res.status(501).json({ success: false, message: 'Faucet not configured' });
    }

    // Example payload; adjust to match your faucet provider
    const payload = {
      address: user.wallet.address,
      chainId: process.env.FAUCET_CHAIN_ID || 137,
      amount: '1',
      reason: 'Sideline Pinas faucet request',
    };

    const resp = await axios.post(faucetUrl, payload, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
    });

    return res.json({ success: true, message: 'Faucet requested', data: resp.data });
  } catch (error) {
    console.error('Faucet request error:', error?.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Faucet request failed', error: error.message });
  }
});

module.exports = router;
