// import the express router
const router = require('express').Router();

// import the article controller
const articleCtrl = require('../controllers/articles');
// GET /articles route using controller middleware
router.get('/', articleCtrl.getContent);
// GET /articles/:id
router.get('/:id', articleCtrl.getOneById);
// POST /articles
router.post('/', articleCtrl.createArticle);
// PUT /articles/:id
router.put('/:id', articleCtrl.updateArticle);
// export the route from this file
module.exports = router;
