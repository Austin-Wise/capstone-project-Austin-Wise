const axios = require('axios');
const { sendError } = require('../utils/errorHandling');

const getData = async (ticker, res) => {
  const companyUrl =
    `https://cloud.iexapis.com/stable/stock/${ticker}/company` +
    `?token=${process.env.IEXKEY}`;
  const quoteUrl =
    `https://api.worldtradingdata.com/api/v1/stock?symbol=${ticker}` +
    `&api_token=${process.env.WTDKEY}`;

  try {
    const companyResponse = await axios.get(companyUrl);
    const quoteResponse = await axios.get(quoteUrl);
    const { data: companyData } = companyResponse;
    const {
      data: {
        data: [quoteData],
      },
    } = quoteResponse;
    const data = {
      id: companyData.symbol,
      name: companyData.companyName,
      ticker: companyData.symbol,
      ceo: companyData.CEO,
      employees: companyData.employees,
      industry: companyData.sector,
      location: `${companyData.city}, ${companyData.state}`,
      open: quoteData.price_open,
      high: quoteData.day_high,
      low: quoteData.day_low,
      close: quoteData.close_yesterday,
      volume: quoteData.volume,
      yearHigh: quoteData['52_week_high'],
      yearLow: quoteData['52_week_low'],
      exchange: quoteData.stock_exchange_short,
      shares: quoteData.shares,
      mktCap: quoteData.market_cap,
      price: quoteData.price,
      chgPct: quoteData.change_pct,
      dayChange: quoteData.day_change,
    };
    return data;
  } catch (e) {
    sendError(res)(e);
  }
};

// price contains marketOpen, marketClose, marketHigh, marketLow, marketAverage, marketVolume,

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
