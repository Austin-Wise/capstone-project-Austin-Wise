// load in the articles model
const { Bookmarks, Notes, Sequelize } = require('../models');
const { throwIf, throwError, sendError } = require('../utils/errorHandling');

// get all the bookmarks
exports.getContent = async (req, res) => {
  // run the find all function on the model
  try {
    const bookmarks = await Bookmarks.findAll().catch(
      throwError(500, 'sequelize error')
    );
    // respond with json of the bookmarks array
    res.json(bookmarks);
  } catch (e) {
    sendError(res)(e);
  }
};

// find one bookmark by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // search our bookmark model for the bookmark
    const bookmark = await Bookmarks.findByPk(id).then(
      // first argument - if SQL Query worked correctly
      throwIf(row => !row, 404, 'not found', 'Bookmark Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if the bookmark is found send it back.
    res.status(200).json(bookmark);
  } catch (e) {
    sendError(res)(e);
  }
};

// add a new bookmark
exports.createBookmark = async (req, res) => {
  // get the articleId, ticker and userId values from the request body
  const { id, articleId, headline, source, url, summary, ticker } = req.body;
  // create the item and save the new id
  try {
    const bookmark = await Bookmarks.create({
      id,
      articleId,
      headline,
      source,
      url,
      summary,
      ticker,
      userId: req.token.id,
      // 'catch' catches errors specific to validation. These are presets created within the models (isAlpha, len, etc..)
      // Catch first required, Captures type, second provides error code.
    })
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    // send the new id back to the request
    res.status(200).json(bookmark);
  } catch (e) {
    sendError(res)(e);
  }
};

// update an existing bookmark
exports.updateBookmark = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBookmarks = await Bookmarks.update(req.body, id)
      .catch(Sequelize.ValidationError, throwError(422, 'Validation Error'))
      .catch(throwError(500, 'sequelize error'));
    res.json(updatedBookmarks);
  } catch (e) {
    sendError(res)(e);
  }
};

// delete a bookmark
exports.removeBookmark = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove th bookmark
  try {
    await Notes.destroy({ where: { bookmarkId: id } }).catch(
      throwError(500, 'sequelize error')
    );
    await Bookmarks.destroy({ where: { id } }).then(
      // first argument - if SQL Query worked correctly
      throwIf(numRows => !numRows, 404, 'not found', 'Bookmark Not Found'),
      // second argument - if it failed
      throwError(500, 'sequelize error')
      // ? Only accepts 2 arguments
    );
    // if th bookmark is found send it back.
    // send a good status code
    // sendStatus stops at sendStatus, whereas status allows chaining
    res.sendStatus(202);
  } catch (e) {
    sendError(res)(e);
  }
};
