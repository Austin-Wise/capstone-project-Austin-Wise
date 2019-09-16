// import the express router
const router = require('express').Router();

// import the note controller
const noteCtrl = require('../controllers/notes');
// GET /notes route using controller middleware
router.get('/', noteCtrl.getContent);
// GET /notes/:id
router.get('/:id', noteCtrl.getOneById);
// POST /notes
router.post('/', noteCtrl.createNote);
// PUT /notes/:id
router.put('/:id', noteCtrl.updateNote);
// export the route from this file
module.exports = router;
