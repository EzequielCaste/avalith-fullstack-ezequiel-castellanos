const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Access denied',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
};
