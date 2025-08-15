const express = require('express');
const router = express.Router();
const { randomBytes } = require('crypto');
const Web3 = require('web3');
const User = require('../models/User');

const web3 = new Web3(process.env.WEB3_PROVIDER_URL || 'http://localhost:8545');

// Request a nonce to sign with MetaMask for wallet linking
router.post('/request-nonce', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const nonce = 'Link wallet nonce: ' + randomBytes(16).toString('hex');
    user.wallet.nonce = nonce;
    await user.save();

    return res.json({ success: true, data: { nonce } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to issue nonce', error: error.message });
  }
});

// Verify signature from MetaMask and link address
router.post('/verify-signature', async (req, res) => {
  try {
    const { userId, address, signature } = req.body;
    if (!userId || !address || !signature) {
      return res.status(400).json({ success: false, message: 'userId, address, and signature are required' });
    }

    const user = await User.findById(userId);
    if (!user || !user.wallet?.nonce) {
      return res.status(400).json({ success: false, message: 'No nonce issued for this user' });
    }

    const message = user.wallet.nonce;
    const recovered = web3.eth.accounts.recover(message, signature);

    if (!recovered || recovered.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ success: false, message: 'Signature verification failed' });
    }

    user.wallet.address = address;
    user.wallet.verified = true;
    user.wallet.nonce = null;
    await user.save();

    return res.json({ success: true, message: 'Wallet linked', data: { address } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to verify signature', error: error.message });
  }
});

module.exports = router;
