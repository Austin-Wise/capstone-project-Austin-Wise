// import the express router
const router = require('express').Router();

// import the companyData controller
const companyDataCtrl = require('../controllers/companyDatas');
// GET /companyDatas route using controller middleware
router.get('/', companyDataCtrl.getContent);
// GET /companyDatas/:id
router.get('/:id', companyDataCtrl.getOneById);
// export the route from this file
module.exports = router;
