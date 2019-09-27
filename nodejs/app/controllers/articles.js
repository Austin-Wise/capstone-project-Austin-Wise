const axios = require('axios');
const { sendError } = require('../utils/errorHandling');

const getData = async (ticker, res) => {
  const newsUrl =
    `https://cloud.iexapis.com/stable/stock/${ticker}/news` +
    `?token=${process.env.IEXKEY}`;
  const quoteUrl =
    `https://api.worldtradingdata.com/api/v1/stock?symbol=${ticker}` +
    `&api_token=${process.env.WTDKEY}`;

  try {
    const newsResponse = await axios.get(newsUrl);
    const { data: newsData } = newsResponse;
    // const {
    //   data: {
    //     data: [quoteData],
    //   },
    // } = quoteResponse;
    const data = {
      dateTime: newsData.datetime,
      headline: newsData.headline,
      source: newsData.source,
      url: newsData.url,
      summary: newsData.summary,
      related: newsData.related.split(','),
      image: newsData.image,
      lang: newsData.lang,
    };
    return data;
  } catch (e) {
    sendError(res)(e);
  }
};

// find one companyData entry by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    const companyData = await getData(id, res);
    // if the data is found send it back.
    res.status(200).json(companyData);
  } catch (e) {
    sendError(res)(e);
  }
};
const data = [
  {
    id: 'b9f9e99a-8b91-4dde-93b8-a2dcc1d3a215',
    ticker: 'AAPL',
    title: 'Apple Stock Is Still Headed to $245',
    text:
      'Apple (NASDAQ:AAPL) is still arguably the best company on the planet. They have accomplished amazing things in spite of a lot of criticism of Tim Cook’s leadership. I personally don’t believe that he’s the best person for the job, but that doesn’t stop me from betting bullish on the Apple stock every chance I get.',
    source: 'CNBC',
    published: '22/05/2001',
    rating: -0.2,
  },
  {
    id: '02b23d12-3e1d-4111-9cbf-f87da3671297',
    ticker: 'AAPL',
    title:
      "What's Next for Apple (AAPL) Stock: Holiday Shopping, iPhone 11, Apple TV+",
    text:
      'Some analysts, including Goldman Sachs GS, are worried that Apple TV+ will hurt Apple’s bottom line. But investors and Wall Street should perhaps look ahead to Apple’s Q4 fiscal 2019 and ...',
    source: 'CNBC',
    published: '22/05/2001',
    rating: -0.2,
  },
  {
    id: '034899a6-d10d-40fb-8bbd-aff30864025f',
    ticker: 'GOOGL',
    title:
      'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
    text:
      'Today’s fed announcement might cause volatility, but my personal overall market thesis is that we will make new all-time highs soon. I expect fireworks this week, but if we dip there will be buyers to pick the pieces up and run higher. I still believe that there are too many bears who are too comfortable being short when markets are at all-time highs and when the global central banks are dedicated to inflating the economies.',
    source: 'CNBC',
    published: '22/05/2001',
    rating: -0.2,
  },
  {
    id: '506f4a26-dd6a-4432-8fde-c54eafd61720',
    ticker: 'AAPL',
    title:
      'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
    text:
      'The research is interesting and comprehensive, but the impact of the flaws on most iPhone users may not be huge. Also, Google is using the compiled research to publicly needle Apple, following Apple’s campaign to differentiate its products on privacy and security.',
    source: 'CNBC',
    published: '22/05/2001',
    rating: -0.2,
  },
];

// find one article entry by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  try {
    // search our articles for the object
    const articles = data.find(d => id === d.id);
    // if the data is found send it back.
    res.status(200).json(articles);
  } catch (e) {
    sendError(res)(e);
  }
};

// find one article entry by ticker
exports.getByTicker = (req, res) => {
  // get the ticker from the route query
  const { ticker } = req.query;
  try {
    // search our articles for the object
    const articles = data.filter(d => ticker === d.ticker);
    // if the data is found send it back.
    res.status(200).json(articles);
  } catch (e) {
    console.log(e);
    sendError(res)(e);
  }
};
