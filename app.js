const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERROR_NOT_FOUND } = require('./utils/utils');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63222af8321717a1989b1666',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' }));

app.listen(PORT);
