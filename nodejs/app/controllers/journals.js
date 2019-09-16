// load in the journals model
const { Journals } = require('../models');
// get all the journals
exports.getContent = (req, res) => {
  // run the find all function on the model
  const journals = Journals.findAll();
  // respond with json of the journals array
  res.json(journals);
};

// find one journal by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our journal model for the journal
  const journal = Journals.findByPk(id);
  // if no journal is found
  if (!journal) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the journal is found send it back.
  res.json(journal);
};

// add a new journal
exports.createJournal = (req, res) => {
  // get the ticker, title, text, source, published and rating values from the request body
  const { name, userId } = req.body;
  // create the item and save the new id
  const id = Journals.create({
    name,
    userId
  });
  // send the new id back to the request
  res.json({ id });
};

// update an existing journal
exports.updateJournal = (req, res) => {
  const { id } = req.params;
  const updatedJournals = Journals.update(req.body, id);
  res.json(updatedJournals);
};

// delete an journal
exports.removeJournal = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the journal
  Journals.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
