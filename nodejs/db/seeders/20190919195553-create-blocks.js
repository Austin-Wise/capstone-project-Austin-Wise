module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Blocks',
      [
        {
          id: '4b549970-6a7e-44b4-9e25-d78975bb78cf',
          name: 'CNN',
          userId: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      { updateOnDuplicate: true }
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Blocks', null, {});
  },
};
