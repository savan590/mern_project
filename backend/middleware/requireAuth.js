const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET); 
    req.user = decoded.user;

    const user = req.user;
    if (!user || user.role !== 'manager') {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
