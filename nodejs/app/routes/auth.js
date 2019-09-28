// import the express router
const router = require('express').Router();

// import the auth controller
const authCtrl = require('../controllers/auth');
// POST /auth/login
router.post('/login', authCtrl.login);
// GET /auth/:id
router.post('/forgot', authCtrl.forgotPassword);
// PUT /auth/:id
router.put('/reset', authCtrl.resetPassword);
// POST /auth
router.post('/', authCtrl.signUp);
// export the route from this file
module.exports = router;
