// load in the articles model
const { Bookmarks } = require('../models');
// get all the articles
exports.getContent = (req, res) => {
  // run the find all function on the model
  const articles = Bookmarks.findAll();
  // respond with json of the articles array
  res.json(articles);
};

// find one bookmark by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our bookmark model for the bookmark
  const bookmark = Bookmarks.findByPk(id);
  // if no bookmark is found
  if (!bookmark) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the bookmark is found send it back.
  res.json(bookmark);
};

// add a new bookmark
exports.createBookmark = (req, res) => {
  // get the articleId, ticker and userId values from the request body
  const { articleId, ticker, userId } = req.body;
  // create the item and save the new id
  const id = Bookmarks.create({
    articleId,
    ticker,
    userId
  });
  // send the new id back to the request
  res.json({ id });
};

// update an existing bookmark
exports.updateBookmark = (req, res) => {
  const { id } = req.params;
  const updatedBookmarks = Bookmarks.update(req.body, id);
  res.json(updatedBookmarks);
};

// delete an bookmark
exports.removeBookmark = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the bookmark
  Bookmarks.destroy(id);
  // send a good status code
  res.sendStatus(200);
};
