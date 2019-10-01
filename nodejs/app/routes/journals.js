// import the express router
const router = require('express').Router();

// import the journal controller
const journalCtrl = require('../controllers/journals');
// GET /journals route using controller middleware
router.get('/', journalCtrl.getContent);
// GET /journals/:id
router.get('/:id', journalCtrl.getOneById);
// POST /journals
router.post('/', journalCtrl.createJournal);
// PUT /journals/:id
router.put('/:id', journalCtrl.updateJournal);
// DELETE /journals/:id
router.delete('/:id', journalCtrl.removeJournal);
// export the route from this file
module.exports = router;
