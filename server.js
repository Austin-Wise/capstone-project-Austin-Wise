const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// const homeRoute = require('./reactjs/src/App');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Put CRUD routes here

// Only for production builds on Heroku
if (process.env.NODE_ENV === 'production') {
  // Express will serve up assets
  // like main.js and main.css
  app.use(express.static('reactjs/build'));
  // Express will serve up the index.html
  // if it doesn't recognize the route
  const path = require('path');

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'reactjs', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
