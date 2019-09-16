// load in the companyData model
const { CompanyData } = require('../models');

// find one companyData by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our companyData model for the companyData
  const companyData = CompanyData.findByPk(id);
  // if no companyData is found
  if (!companyData) {
    // return a 404
    res.sendStatus(404);
    return;
  }

  // if the companyData is found send it back.
  res.json(companyData);
};
