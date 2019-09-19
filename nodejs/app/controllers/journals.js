// load in the journals model
const { Journals, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');
// get all the journals
exports.getContent = async (req, res) => {
  // run the find all function on the model
  try {
    const journals = await Journals.findAll().then(
      throwIf(rows => rows.length === 0, 204, 'no results', 'No Results Found'),
      throwError(500, 'sequelize error')
    );
    // respond with json of the journals array
    res.json(journals);
  } catch (e) {
    sendError(res)(e);
  }
};

// find one journal by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // search our journal model for the journal
    const journal = await Journals.findByPk(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(row => !row, 404, 'not found', 'Journal Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the journal is found send it back.
    res.status(200).json(journal);
  } catch (e) {
    sendError(res)(e);
  }
};

// add a new journal
exports.createJournal = async (req, res) => {
  // get the ticker, type, buyDate, qtyBuy, buyPrice, sellDate, qtySold, sellPrice, fees, comment, and userId from the request body
  const {
    ticker,
    type,
    buyDate,
    qtyBuy,
    buyPrice,
    sellDate,
    qtySold,
    sellPrice,
    fees,
    comment,
    userId,
  } = req.body;
  // create the item and save the new id
  try {
    const id = await Journals.create({
      ticker,
      type,
      buyDate,
      qtyBuy,
      buyPrice,
      sellDate,
      qtySold,
      sellPrice,
      fees,
      comment,
      userId,
      // 'catch' catches errors specific to validation. These are presets created within the models (isAlpha, len, etc..)
      // Catch first required, Captures type, second provides error code.
    })
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    // send the new id back to the request
    res.status(200).json({ id });
  } catch (e) {
    sendError(res)(e);
  }
};

// update an existing journal
exports.updateJournal = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJournals = await Journals.update(req.body, id)
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    res.json(updatedJournals);
  } catch (e) {
    sendError(res)(e);
  }
};

// delete an journal
exports.removeJournal = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the journal
  try {
    await Journals.destroy(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(numRows => !numRows, 404, 'not found', 'Journal Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the journal is found send it back.
    // send a good status code
    // sendStatus stops at sendStatus, whereas status allows chaining
    res.sendStatus(202);
  } catch (e) {
    sendError(res)(e);
  }
};
