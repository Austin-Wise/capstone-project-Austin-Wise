// load in the blocks model
const { Blocks, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');
// get all the blocks
exports.getContent = async (req, res) => {
  try {
    const blocks = await Blocks.findAll().then(
      throwIf(rows => rows.length === 0, 204, 'no results', 'No Results Found'),
      throwError(500, 'sequelize error')
    );
    // respond with json of the blocks array
    res.json(blocks);
  } catch (e) {
    sendError(res)(e);
  }
};

// find one block by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // search our block model for the block
    const block = await Blocks.findByPk(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(row => !row, 404, 'not found', 'Block Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the block is found send it back.
    res.status(200).json(block);
  } catch (e) {
    sendError(res)(e);
  }
};

// add a new block
exports.createBlock = async (req, res) => {
  // get the ticker, title, text, source, published and rating values from the request body
  const { name, userId } = req.body;
  // create the item and save the new id
  try {
    const id = await Blocks.create({
      name,
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

// update an existing block
exports.updateBlock = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlocks = await Blocks.update(req.body, id)
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    res.json(updatedBlocks);
  } catch (e) {
    sendError(res)(e);
  }
};

// delete an block
exports.removeBlock = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the block
  try {
    await Blocks.destroy(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(numRows => !numRows, 404, 'not found', 'Block Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the block is found send it back.
    // send a good status code
    // sendStatus stops at sendStatus, whereas status allows chaining
    res.sendStatus(202);
  } catch (e) {
    sendError(res)(e);
  }
};
