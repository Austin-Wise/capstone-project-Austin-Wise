module.exports = (sequelize, DataTypes) => {
  const Blocks = sequelize.define(
    'Blocks',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Keyword cannot contain special characters.',
          },
          notNull: { args: true, msg: 'Keyword input required.' },
          len: {
            args: [2, 20],
            msg: 'Keyword must be between 2 and 20 characters long.',
          },
        },
      },
    },
    {}
  );
  Blocks.associate = models => {
    // associations can be defined here
    Blocks.belongsTo(models.Users, { foreignKey: 'decisionId' });
  };
  return Blocks;
};
