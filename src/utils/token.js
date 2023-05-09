const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generate = (id) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d' });

const decode = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    logger.error(error);
  }
};

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    req.user = decode(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  generate,
  verifyToken,
};
