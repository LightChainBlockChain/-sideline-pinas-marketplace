const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple daily mining claim endpoint
// NOTE: Replace faux-auth (userId in body) with real auth middleware extracting userId from JWT
router.post('/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const enabled = String(process.env.MINING_ENABLED || 'true').toLowerCase() === 'true';
    if (!enabled) return res.status(403).json({ success: false, message: 'Mining is disabled' });

    const reward = parseFloat(process.env.MINING_DAILY_REWARD || '1');
    const cooldownHours = parseInt(process.env.MINING_DAILY_COOLDOWN_HOURS || '24', 10);
    const maxBalance = parseFloat(process.env.MINING_MAX_BALANCE || '1000');

    const now = new Date();
    if (user.mining && user.mining.lastClaimAt) {
      const nextClaimAt = new Date(user.mining.lastClaimAt.getTime() + cooldownHours * 3600 * 1000);
      if (now < nextClaimAt) {
        return res.status(429).json({
          success: false,
          message: 'Claim cooldown in effect',
          data: { nextClaimAt: nextClaimAt.toISOString() }
        });
      }
    }

    // Enforce soft cap on mined tokens
    const newTotalMined = (user.mining?.totalMined || 0) + reward;
    if (newTotalMined > maxBalance) {
      return res.status(403).json({ success: false, message: 'Mining cap reached' });
    }

    user.wallet.tokenBalance = (user.wallet.tokenBalance || 0) + reward;
    user.mining = {
      lastClaimAt: now,
      totalMined: newTotalMined,
    };

    await user.save();

    return res.json({
      success: true,
      message: 'Daily mining reward claimed',
      data: {
        reward,
        tokenBalance: user.wallet.tokenBalance,
        mining: user.mining,
      }
    });
  } catch (error) {
    console.error('Mining claim error:', error);
    return res.status(500).json({ success: false, message: 'Mining claim failed', error: error.message });
  }
});

module.exports = router;
