module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tickers',
      [
        {
          id: 'adaa9b96-2083-497e-b635-3f9f62efd30d',
          userId: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8',
          symbol: 'GOOGL',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Tickers', null, {});
  },
};
