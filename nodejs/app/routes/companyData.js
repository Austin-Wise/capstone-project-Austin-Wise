// import the express router
const router = require('express').Router();

// import the companyData controller
const companyDataCtrl = require('../controllers/companyData');
// GET /company route using controller middleware
router.get('/:id', companyDataCtrl.getOneById);
// export the route from this file
module.exports = router;
