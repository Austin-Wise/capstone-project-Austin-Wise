module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookmarks', 'headline', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Bookmarks', 'source', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Bookmarks', 'url', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Bookmarks', 'summary', {
      type: Sequelize.TEXT,
    });
    await queryInterface.removeColumn('Bookmarks', 'articleId');
    await queryInterface.addColumn('Bookmarks', 'articleId', {
      type: Sequelize.BIGINT,
    });
  },
  // headline, source, url, summary ticker

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bookmarks', 'headline');
    await queryInterface.removeColumn('Bookmarks', 'source');
    await queryInterface.removeColumn('Bookmarks', 'url');
    await queryInterface.removeColumn('Bookmarks', 'summary');
    await queryInterface.removeColumn('Bookmarks', 'articleId');
    await queryInterface.addColumn('Bookmarks', 'articleId', {
      type: Sequelize.STRING,
    });
  },
};
