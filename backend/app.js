const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const {
  router,
  userRouter,
  cardsRouter,
} = require('./routes');
const { loginValidation, createUserValidation } = require('./middlewares/validations');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
app.use(router);
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.get('/logout', (req, res) => {
  res.clearCookie('jwt').send();
});
app.use(userRouter);
app.use(cardsRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует!'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App start');
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
