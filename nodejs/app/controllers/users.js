// load in the tickers model
const { Users } = require('../models');
// get all the tickers
exports.getContent = (req, res) => {
  // run the find all function on the model
  const tickers = Users.findAll();
  // respond with json of the tickers array
  res.json(tickers);
};

// find one ticker by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our ticker model for the ticker
  const ticker = Users.findByPk(id);
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
exports.createUser = (req, res) => {
  // get the firstName, lastName, email, and password values from the request body
  const { firstName, lastName, email, password } = req.body;
  // create the item and save the new id
  const id = Users.create({
    firstName,
    lastName,
    email,
    password
  });
  // send the new id back to the request
  res.json({ id });
};

// update an existing ticker
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updatedUsers = Users.update(req.body, id);
  res.json(updatedUsers);
};

// delete an ticker
exports.removeUser = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the ticker
  Users.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
