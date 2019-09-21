module.exports = (sequelize, DataTypes) => {
  const Tickers = sequelize.define(
    'Tickers',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      symbol: {
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
  Tickers.associate = models => {
    // associations can be defined here
    Tickers.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Tickers;
};
