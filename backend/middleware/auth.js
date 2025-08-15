const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  try {
    const header = req.headers['authorization'] || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Missing authorization token' });

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    req.user = payload; // { userId, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
