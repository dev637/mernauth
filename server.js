const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const { loginRequired } = require('./middleware/auth');

dotenv.config();

const users = require('./routes/api/users');
const items = require('./routes/api/items');
const sendResetEmail = require('./routes/api/sendResetEmail');
const resetUrlStatus = require('./routes/api/resetUrlStatus');
const passwordReset = require('./routes/api/passwordReset');
const statistics = require('./routes/api/statistics');
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const db = require('./config/keys').MONGODB_URI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successully'))
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);

app.use('/api/items', loginRequired, items);

app.use('/api/sendResetEmail', sendResetEmail);

app.use('/api/resetUrlStatus', resetUrlStatus);

app.use('/api/passwordReset', passwordReset);

app.use('/api/statistics', statistics);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
