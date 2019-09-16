// load in the tickers model
const { Tickers } = require('../models');
// get all the tickers
exports.getContent = (req, res) => {
  // run the find all function on the model
  const tickers = Tickers.findAll();
  // respond with json of the tickers array
  res.json(tickers);
};

// find one ticker by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our ticker model for the ticker
  const ticker = Tickers.findByPk(id);
  // if no ticker is found
  if (!ticker) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the ticker is found send it back.
  res.json(ticker);
};
// add a new ticker
exports.createTicker = (req, res) => {
  // get the ticker, title, text, source, published and rating values from the request body
  const { userId, symbol } = req.body;
  // create the item and save the new id
  const id = Tickers.create({
    userId,
    symbol
  });
  // send the new id back to the request
  res.json({ id });
};

// update an existing ticker
exports.updateTicker = (req, res) => {
  const { id } = req.params;
  const updatedTickers = Tickers.update(req.body, id);
  res.json(updatedTickers);
};

// delete an ticker
exports.removeTicker = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the ticker
  Tickers.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
