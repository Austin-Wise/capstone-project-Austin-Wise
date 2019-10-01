// import the express router
const router = require('express').Router();

// import the article controller
const articleCtrl = require('../controllers/articles');
// GET /articles route using controller middleware
router.get('/:id', articleCtrl.getOneById);
// GET /articles/:id
router.get('/', articleCtrl.getByTicker);
// export the route from this file
module.exports = router;
