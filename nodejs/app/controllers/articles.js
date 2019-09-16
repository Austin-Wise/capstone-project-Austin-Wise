// load in the articles model
const { Articles } = require('../models');
// get all the articles
exports.getContent = (req, res) => {
  // run the find all function on the model
  const articles = Articles.findAll();
  // respond with json of the articles array
  res.json(articles);
};

// find one article by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our article model for the article
  const article = Articles.findByPk(id);
  // if no article is found
  if (!article) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the article is found send it back.
  res.json(article);
};

// add a new article
exports.createArticle = (req, res) => {
  // get the ticker, title, text, source, published and rating values from the request body
  const { ticker, title, text, source, published, rating } = req.body;
  // create the item and save the new id
  const id = Articles.create({ ticker, title, text, source, published, rating });
  // send the new id back to the request
  res.json({ id });
};

// update an existing article
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const updatedArticles = Articles.update(req.body, id);
  res.json(updatedArticles);
};

// delete an article
exports.removeArticle = (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the article
  Articles.destroy(id);
  // send a good status code
  res.sendStatus(200);
};