module.exports = (sequelize, DataTypes) => {
  const Bookmarks = sequelize.define(
    'Bookmarks',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      articleId: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
        },
      },
      ticker: {
        type: DataTypes.STRING,
        notNull: {
          args: true,
          msg: 'Ticker Symbol value is required.',
        },
        isAlpha: {
          args: true,
          msg: 'Ticker Symbol must only contain letters.',
        },
        len: {
          args: [1, 6],
          msg: 'Ticker Symbol must be be between 1 and 6 letters in length.',
        },
      },
    },
    {}
  );
  Bookmarks.associate = models => {
    Bookmarks.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Bookmarks.hasOne(models.Notes, { foreignKey: 'bookmarkId' });
  };
  return Bookmarks;
};
