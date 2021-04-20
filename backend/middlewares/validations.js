const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const checkIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина подписи - 2 символа',
        'string.max': 'Максимальная длина подписи - 30 ссимволов',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      // eslint-disable-next-line no-useless-escape
      if (/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Укажите почту.',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Укажите пароль.',
        'string.min': 'Минимальная длина пароля - 8 символов.',
      }),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина имени - 2 символа',
        'string.max': 'Максимальная длина имени - 30 ссимволов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина описания - 2 символа',
        'string.max': 'Максимальная длина описания - 30 ссимволов',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      // eslint-disable-next-line no-useless-escape
      if (/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Укажите почту.',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Укажите пароль.',
        'string.min': 'Минимальная длина пароля - 8 символов.',
      }),
  }),
});

const authValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().min(2).max(200).required(),
  }).unknown(),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Укажите имя.',
        'string.min': 'Минимальная длина имени - 2 символа',
        'string.max': 'Максимальная длина имени - 30 ссимволов',
      }),
    about: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Укажите описание.',
        'string.min': 'Минимальная длина описания - 2 символа',
        'string.max': 'Максимальная длина описания - 30 ссимволов',
      }),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      // eslint-disable-next-line no-useless-escape
      if (/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
  authValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
  createCardValidation,
  checkIdValidation,
};
