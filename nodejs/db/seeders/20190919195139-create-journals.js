module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Journals',
      [
        {
          id: 'b13f0ff6-9025-4f30-8a09-40545beadedb',
          ticker: 'AAPL',
          type: 'Long',
          buyDate: '05/22/2001',
          qtyBuy: 20,
          buyPrice: 210.2,
          sellDate: '05/22/2001',
          qtySold: 20,
          sellPrice: 214.11,
          fees: 3,
          comment: 'Sell before Q1 news',
          userId: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          id: '254ec712-6e39-4da0-a680-09e459e27d76',
          ticker: 'GOOGL',
          type: 'Short',
          buyDate: '05/22/2003',
          qtyBuy: 20,
          buyPrice: 240.2,
          sellDate: '05/22/2006',
          qtySold: 20,
          sellPrice: 104.11,
          fees: 3,
          comment: 'Do Something!',
          userId: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {
        updateOnDuplicate: [
          'ticker',
          'type',
          'buyDate',
          'qtyBuy',
          'buyPrice',
          'sellDate',
          'qtySold',
          'sellPrice',
          'fees',
          'comment',
        ],
        upsertKeys: ['id'],
      }
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Journals', null, {});
  },
};
