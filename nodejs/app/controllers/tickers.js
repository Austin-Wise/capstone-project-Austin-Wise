// load in the notes model
// load in the tickers model
const { Tickers, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');
// get all the tickers
exports.getContent = async (req, res) => {
  // run the find all function on the model
  try {
    const tickers = await Tickers.findAll().catch(
      throwError(500, 'sequelize error')
    );
    // respond with json of the tickers array
    res.json(tickers);
  } catch (e) {
    sendError(res)(e);
  }
};

// find one ticker by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // search our ticker model for the ticker
    const ticker = await Tickers.findByPk(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(row => !row, 404, 'not found', 'Ticker Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the ticker is found send it back.
    res.status(200).json(ticker);
  } catch (e) {
    sendError(res)(e);
  }
};

// add a new ticker
exports.createTicker = async (req, res) => {
  // get the heading, body, and bookmarkId from the request body
  const { id, symbol } = req.body;
  // create the item and save the new id
  try {
    const ticker = await Tickers.create({
      id,
      symbol,
      // 'catch' catches errors specific to validation. These are presets created within the models (isAlpha, len, etc..)
      // Catch first required, Captures type, second provides error code.
    })
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    // send the new id back to the request
    res.status(200).json(ticker);
  } catch (e) {
    sendError(res)(e);
  }
};

// update an existing ticker
exports.updateTicker = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTickers = await Tickers.update(req.body, id)
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    res.json(updatedTickers);
  } catch (e) {
    sendError(res)(e);
  }
};

// delete an note
// delete an ticker
exports.removeTicker = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the note
  // remove the ticker
  try {
    await Tickers.destroy({ where: { id } }).then(
      // first argument - if SQL Query worked correctly
      throwIf(numRows => !numRows, 404, 'not found', 'Ticker Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the note is found send it back.
    // if the ticker is found send it back.
    // send a good status code
    // sendStatus stops at sendStatus, whereas status allows chaining
    res.sendStatus(202);
  } catch (e) {
    sendError(res)(e);
  }
};
