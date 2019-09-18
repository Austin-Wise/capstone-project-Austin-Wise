// import the express router
const router = require('express').Router();

// import the bookmark controller
const bookmarkCtrl = require('../controllers/bookmarks');
// GET /bookmarks route using controller middleware
router.get('/', bookmarkCtrl.getContent);
// GET /bookmarks/:id
router.get('/:id', bookmarkCtrl.getOneById);
// POST /bookmarks
router.post('/', bookmarkCtrl.createBookmark);
// PUT /bookmarks/:id
router.put('/:id', bookmarkCtrl.updateBookmark);
// export the route from this file
module.exports = router;
