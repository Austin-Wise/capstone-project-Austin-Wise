// load in the imports
const error = require('debug')('api:error');
const express = require('express');
// ? body-Parser normalizes our incoming data, allows us to use req.body
const bodyParser = require('body-parser');
// ? morgan-debug logs every request made to the server (makes debugging easier)
const morganDebug = require('morgan-debug');
const isAuth = require('./utils/isAuth');
// ? routes

const userRouter = require('./routes/users.js');
const articleRouter = require('./routes/articles.js');
const blockRouter = require('./routes/blocks');
const bookmarkRouter = require('./routes/bookmarks');
const companyDataRouter = require('./routes/companyData');
const journalRouter = require('./routes/journals');
const noteRouter = require('./routes/notes');
const tickerRouter = require('./routes/tickers');
const authRouter = require('./routes/auth');

// ? create an express app
const app = express();
// ? checks to see if the content-type is json and parses it into req.body
app.use(bodyParser.json());

// ? log all requests
app.use(morganDebug('api:request', 'dev'));

// ? Using /api/ so it doesn't conflict with front-end stuff.
// ? setup the app to use the router at /api/news, journal, etc.

app.use('/api/users', isAuth, userRouter);
app.use('/api/articles', isAuth, articleRouter);
app.use('/api/blocks', isAuth, blockRouter);
app.use('/api/bookmarks', isAuth, bookmarkRouter);
app.use('/api/companydata', isAuth, companyDataRouter);
app.use('/api/journals', isAuth, journalRouter);
app.use('/api/notes', isAuth, noteRouter);
app.use('/api/tickers', isAuth, tickerRouter);
app.use('/api/auth', authRouter);

// ? four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
    return;
  }
  error('ERROR FOUND:', err);
  console.log(err);
  res.sendStatus(500);
});

// ? export the express app
module.exports = app;
