const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);

module.exports = {
  router,
  userRouter,
  cardsRouter,
};
