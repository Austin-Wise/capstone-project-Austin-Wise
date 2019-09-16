// import the express router
const router = require('express').Router();

// import the block controller
const blockCtrl = require('../controllers/blocks');
// GET /blocks route using controller middleware
router.get('/', blockCtrl.getContent);
// GET /blocks/:id
router.get('/:id', blockCtrl.getOneById);
// POST /blocks
router.post('/', blockCtrl.createBlock);
// PUT /blocks/:id
router.put('/:id', blockCtrl.updateBlock);
// export the route from this file
module.exports = router;
