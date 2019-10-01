module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Bookmarks',
      [
        {
          id: '506f4a26-dd6a-4432-8fde-c54eafd61720',
          ticker: 'AAPL',

          userId: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
          headline:
            'Microsoft, Google, Visa, Mastercard may set up base at GIFT-City',
          source: 'The Economic Times India',
          url:
            'https://cloud.iexapis.com/v1/news/article/4ef0181b-7375-4566-bdfb-379a1360d626',
          summary:
            'The state plans to develop GIFT-city as a technology and fintech hub, and is expected to also unveil its fintech policy soon.',
          articleId: 1569558262000,
        },
      ],
      {
        updateOnDuplicate: ['articleId', 'ticker'],
        upsertKeys: ['id'],
      }
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Bookmarks', null, {});
  },
};
