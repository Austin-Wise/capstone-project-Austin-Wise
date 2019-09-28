module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'token', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'expires', {
      type: Sequelize.DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('Users', 'token');
    await queryInterface.removeColumn('Users', 'expires');
  },
};
