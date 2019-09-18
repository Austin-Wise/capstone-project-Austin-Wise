// load in the notes model
const { Notes } = require('../models');
// get all the notes
exports.getContent = (req, res) => {
  // run the find all function on the model
  const notes = Notes.findAll();
  // respond with json of the notes array
  res.json(notes);
};

// find one note by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our note model for the note
  const note = Notes.findByPk(id);
  // if no note is found
  if (!note) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the note is found send it back.
  res.json(note);
};

// add a new note
exports.createNote = (req, res) => {
  // get the ticker, title, text, source, published and rating values from the request body
  const { name, userId } = req.body;
  // create the item and save the new id
  const id = Notes.create({
    name,
    userId
  });
  // send the new id back to the request
  res.json({ id });
};

// update an existing note
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const updatedNotes = Notes.update(req.body, id);
  res.json(updatedNotes);
};

// delete an note
exports.removeNote = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the note
  Notes.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
