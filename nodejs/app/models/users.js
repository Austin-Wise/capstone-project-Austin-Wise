module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'First name is required' },
          isAlpha: { args: true, msg: 'First name must only contain letters' },
          len: {
            args: [2, 50],
            msg: 'First name must be between 2 and 50 characters in length',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Last name is required' },
          is: {
            args: [/^[A-Za-z\s-]+$/],
            msg: 'Last name may only contain letters, hyphens, and spaces.',
          },
          len: {
            args: [2, 50],
            msg: 'Last name must be between 2 and 50 characters in length',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Email is required' },
          isEmail: {
            args: true,
            msg: 'Email field must contain a valid email.',
          },
          len: {
            args: [2, 50],
            msg: 'Email must be between 4 and 50 characters in length',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Password is required' },
          len: {
            args: [6, 250],
            msg: 'Password must be more than 6 characters long',
          },
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {}
  );
  Users.associate = models => {
    Users.hasMany(models.Tickers, { foreignKey: 'userId' });
    Users.hasMany(models.Bookmarks, { foreignKey: 'userId' });
    Users.hasMany(models.Notes, { foreignKey: 'userId' });
    Users.hasMany(models.Journals, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.Blocks, {
      foreignKey: 'userId',
    });
  };
  return Users;
};
