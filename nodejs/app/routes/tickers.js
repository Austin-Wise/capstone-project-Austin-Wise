// import the express router
const router = require('express').Router();

// import the ticker controller
const tickerCtrl = require('../controllers/tickers');
// GET /tickers route using controller middleware
router.get('/', tickerCtrl.getContent);
// GET /tickers/:id
router.get('/:id', tickerCtrl.getOneById);
// POST /tickers
router.post('/', tickerCtrl.createTicker);
// PUT /tickers/:id
router.put('/:id', tickerCtrl.updateTicker);
// export the route from this file
module.exports = router;
