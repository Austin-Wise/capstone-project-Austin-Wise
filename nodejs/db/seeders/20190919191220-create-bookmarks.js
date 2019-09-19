module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Bookmarks',
      [
        {
          id: '506f4a26-dd6a-4432-8fde-c54eafd61720',
          articleId: 'b9f9e99a-8b91-4dde-93b8-a2dcc1d3a215',
          ticker: 'AAPL',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Bookmarks', null, {});
  },
};
