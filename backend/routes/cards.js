const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  authValidation,
  createCardValidation,
  checkIdValidation,
} = require('../middlewares/validations');

router.get('/', authValidation, getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', checkIdValidation, deleteCard);
router.put('/:id/likes', checkIdValidation, likeCard);
router.delete('/:id/likes', checkIdValidation, dislikeCard);

module.exports = router;
