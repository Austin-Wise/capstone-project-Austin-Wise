module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Notes',
      [
        {
          id: '62ceeec9-b895-4119-8646-b4ca0be3c235',
          heading: 'A dog bit his owner',
          body: 'The owner yelped, reviewing one star for the dog.',
          bookmarkId: '506f4a26-dd6a-4432-8fde-c54eafd61720',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {
        updateOnDuplicate: ['heading', 'body'],
        upsertKeys: ['id'],
      }
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Notes', null, {});
  },
};
