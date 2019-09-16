// load in the articles model
const { Blocks } = require('../models');
// get all the articles
exports.getContent = (req, res) => {
  // run the find all function on the model
  const articles = Blocks.findAll();
  // respond with json of the articles array
  res.json(articles);
};

// find one block by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our block model for the block
  const block = Blocks.findByPk(id);
  // if no block is found
  if (!block) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the block is found send it back.
  res.json(block);
};

// add a new block
exports.createBlock = (req, res) => {
  // get the ticker, title, text, source, published and rating values from the request body
  const { name, userId } = req.body;
  // create the item and save the new id
  const id = Blocks.create({
    name,
    userId
  });
  // send the new id back to the request
  res.json({ id });
};

// update an existing block
exports.updateBlock = (req, res) => {
  const { id } = req.params;
  const updatedBlocks = Blocks.update(req.body, id);
  res.json(updatedBlocks);
};

// delete an block
exports.removeBlock = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the block
  Blocks.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
