// load in the imports
const error = require('debug')('api:error');
const express = require('express');
// ? body-Parser normalizes our incoming data, allows us to use req.body
const bodyParser = require('body-parser');
// ? morgan-debug logs every request made to the server (makes debugging easier)
const morganDebug = require('morgan-debug');
// ? routes
const articleRouter = require('./routes/articles.js');
const blockRouter = require('./routes/blocks');
const bookmarkRouter = require('./routes/bookmarks');
const companyDataRouter = require('./routes/companydata');
const journalRouter = require('./routes/journals');
const noteRouter = require('./routes/notes');
const tickerRouter = require('./routes/tickers');

// ? create an express app
const app = express();
// ? checks to see if the content-type is json and parses it into req.body
app.use(bodyParser.json());

// ? log all requests
app.use(morganDebug('api:request', 'dev'));

// ? Using /api/ so it doesn't conflict with front-end stuff.
// ? setup the app to use the router at /api/news, journal, etc.
app.use('/api/articles', articleRouter);
app.use('/api/blocks', blockRouter);
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/companydata', companyDataRouter);
app.use('/api/journals', journalRouter);
app.use('/api/notes', noteRouter);
app.use('/api/tickers', tickerRouter);

// ? four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// ? export the express app
module.exports = app;
