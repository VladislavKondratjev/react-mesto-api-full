const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized-error');
const { JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      next(new UnathorizedError('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnathorizedError('Необходима авторизация'));
  }
};
