const axios = require('axios');
const { Blocks } = require('../models');
const { throwError, sendError } = require('../utils/errorHandling');

// eslint-disable-next-line consistent-return
const getData = async (userId, ticker, res) => {
  const newsUrl =
    `https://cloud.iexapis.com/stable/stock/${ticker}/news` +
    `?token=${process.env.IEXKEY}`;

  try {
    const newsResponse = await axios.get(newsUrl);
    const { data: newsData } = newsResponse;

    const data = newsData.map(d => ({
      ticker,
      id: d.datetime,
      headline: d.headline,
      source: d.source,
      url: d.url,
      summary: d.summary,
      related: d.related.split(','),
      image: d.image,
      lang: d.lang,
    }));
    const blocks = await Blocks.findAll({
      where: { userId },
    }).catch(throwError(500, 'sequelize error'));

    const blockedWords = blocks.map(block => block.name);

    // Filter -> true if filtered word remains
    //           false if not

    const filteredArticles = data.filter(article =>
      blockedWords.reduce((bool, word) => {
        if (word.toLowerCase() === article.source.toLowerCase()) return false;
        return bool;
      }, true)
    );

    return filteredArticles;
  } catch (e) {
    sendError(res)(e);
  }
};

exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.param;
  try {
    const newsData = await getData(req.token.id, id, res);
    // if the data is found send it back.
    res.status(200).json(newsData);
  } catch (e) {
    sendError(res)(e);
  }
};
// id, ticker, title, text, source, published, rating

// find one article entry by ticker
exports.getByTicker = async (req, res) => {
  // get the id from the route params
  const { ticker } = req.query;
  try {
    const newsData = await getData(req.token.id, ticker, res);
    // if the data is found send it back.
    res.status(200).json(newsData);
  } catch (e) {
    sendError(res)(e);
  }
};
