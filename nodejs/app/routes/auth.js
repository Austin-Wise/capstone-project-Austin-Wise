// import the express router
const router = require('express').Router();

// import the auth controller
const authCtrl = require('../controllers/auth');
// POST /auth/login
router.post('/login', authCtrl.login);
// GET /auth/:id
router.get('/:id', authCtrl.forgotPassword);
// POST /auth
router.post('/', authCtrl.signUp);
// PUT /auth/:id
router.put('/:id', authCtrl.resetPassword);
// export the route from this file
module.exports = router;
