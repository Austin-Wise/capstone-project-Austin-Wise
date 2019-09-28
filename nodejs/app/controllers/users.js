// load in the users model
const { Users } = require('../models');

// find one user by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our user model for the user
  const user = Users.findByPk(id);
  // if no user is found
  if (!user) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the user is found send it back.
  res.json(user);
};
// add a new user
exports.createUser = (req, res) => {
  // get the firstName, lastName, email, and password values from the request body
  const { id, firstName, lastName, email, password } = req.body;
  // create the item and save the new id
  const user = Users.create({
    id,
    firstName,
    lastName,
    email,
    password,
  });
  // send the new id back to the request
  res.json(user);
};

// update an existing user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updatedUsers = Users.update(req.body, id);
  res.json(updatedUsers);
};
