// load in the notes model
const { Notes, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');
// get all the notes
exports.getContent = async (req, res) => {
  // run the find all function on the model
  try {
    const notes = await Notes.findAll().catch(
      throwError(500, 'sequelize error')
    );
    // respond with json of the notes array
    res.json(notes);
  } catch (e) {
    sendError(res)(e);
  }
};

// find one note by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // search our note model for the note
    const note = await Notes.findByPk(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(row => !row, 404, 'not found', 'Note Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the note is found send it back.
    res.status(200).json(note);
  } catch (e) {
    sendError(res)(e);
  }
};

// add a new note
exports.createNote = async (req, res) => {
  // get the heading, body, and bookmarkId from the request body
  const { id, heading, body, bookmarkId } = req.body;
  // create the item and save the new id
  try {
    const note = await Notes.create({
      id,
      heading,
      body,
      bookmarkId,
      // 'catch' catches errors specific to validation. These are presets created within the models (isAlpha, len, etc..)
      // Catch first required, Captures type, second provides error code.
    })
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    // send the new id back to the request
    res.status(200).json(note);
  } catch (e) {
    sendError(res)(e);
  }
};

// update an existing note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNotes = await Notes.update(req.body, id)
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    res.json(updatedNotes);
  } catch (e) {
    sendError(res)(e);
  }
};

// delete an note
exports.removeNote = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the note
  try {
    await Notes.destroy({ where: { id } }).then(
      // first argument - if SQL Query worked correctly
      throwIf(numRows => !numRows, 404, 'not found', 'Note Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the note is found send it back.
    // send a good status code
    // sendStatus stops at sendStatus, whereas status allows chaining
    res.sendStatus(202);
  } catch (e) {
    sendError(res)(e);
  }
};
