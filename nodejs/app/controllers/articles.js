const axios = require('axios');
const { sendError } = require('../utils/errorHandling');

const getData = async (ticker, res) => {
  const newsUrl =
    `https://cloud.iexapis.com/stable/stock/${ticker}/news` +
    `?token=${process.env.IEXKEY}`;

  try {
    const newsResponse = await axios.get(newsUrl);
    const { data: newsData } = newsResponse;
    // console.log(newsData);

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
    return data;
  } catch (e) {
    sendError(res)(e);
  }
};

exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.param;
  try {
    const newsData = await getData(id, res);
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
    const newsData = await getData(ticker, res);
    // if the data is found send it back.
    res.status(200).json(newsData);
  } catch (e) {
    sendError(res)(e);
  }
};
