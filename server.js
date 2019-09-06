const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const homeRoute = require('./reactjs/src/App');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
