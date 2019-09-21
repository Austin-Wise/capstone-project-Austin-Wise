// import the express router
const router = require('express').Router();

// import the user controller
const userCtrl = require('../controllers/users');
// GET /users route using controller middleware
router.get('/', userCtrl.getContent);
// GET /users/:id
router.get('/:id', userCtrl.getOneById);
// POST /users
router.post('/', userCtrl.createUser);
// PUT /users/:id
router.put('/:id', userCtrl.updateUser);
// DELETE /users/:id
router.delete('/:id', userCtrl.removeUser);
// export the route from this file
module.exports = router;
