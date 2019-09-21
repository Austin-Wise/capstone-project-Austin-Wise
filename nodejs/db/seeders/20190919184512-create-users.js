module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8',
          firstName: 'Austin',
          lastName: 'Wise',
          email: 'austin@wisebydesign.io',
          password: 'hashedpassword',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {
        updateOnDuplicate: ['firstName', 'lastName', 'email', 'password'],
        upsertKeys: ['id'],
      }
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
