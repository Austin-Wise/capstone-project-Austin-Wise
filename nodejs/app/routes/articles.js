// import the express router
const router = require('express').Router();

// import the article controller
const articleCtrl = require('../controllers/articles');
// GET /articles route using controller middleware
router.get('/', articleCtrl.getByTicker);
// GET /articles/:id
router.get('/:id', articleCtrl.getOneById);
// export the route from this file
module.exports = router;
