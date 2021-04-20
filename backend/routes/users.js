const router = require('express').Router();

const {
  getUsers,
  getUserByID,
  updateUserInfo,
  getUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const {
  authValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
  checkIdValidation,
} = require('../middlewares/validations');

router.get('/', authValidation, getUsers);
router.patch('/me', updateUserInfoValidation, updateUserInfo);
router.get('/me', authValidation, getUserInfo);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);
router.get('/:id', checkIdValidation, getUserByID);

module.exports = router;
