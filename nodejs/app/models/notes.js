module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    'Notes',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      heading: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Heading value is required' },
          len: {
            args: [2, 50],
            msg: 'Heading must be between 2 and 50 characters in length',
          },
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Body value is required' },
          len: {
            args: [2, 255],
            msg: 'Body must be between 2 and 255 characters in length',
          },
        },
      },
    },
    {}
  );
  Notes.associate = models => {
    // associations can be defined here
    Notes.belongsTo(models.Bookmarks, { foreignKey: 'bookmarkId' });
    Notes.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Notes;
};
