'use strict';
module.exports = (sequelize, DataTypes) => {
  const Journals = sequelize.define(
    'Journals',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      },
      ticker: {
        type: DataTypes.STRING,
        notNull: {
          args: true,
          msg: 'Ticker Symbol value is required.'
        },
        isAlpha: {
          args: true,
          msg: 'Ticker Symbol must only contain letters.'
        },
        len: {
          args: [1, 6],
          msg: 'Ticker Symbol must be be between 1 and 6 letters in length.'
        }
      },
      type: {
        type: DataTypes.ENUM('Long', 'Short'),
        validate: {
          isIn: {
            args: [['Long', 'Short']],
            msg: 'Type must be either of type Long or Short'
          },
          notNull: { args: true, msg: 'Type cannot be empty.' }
        }
      },
      buyDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: { args: true, msg: '"Buy Date" must be a date.' }
        }
      },
      sellDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: { args: true, msg: '"Sell Date" must be a date.' }
        }
      },
      qtyBuy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: 'Quantity Buy must be a positive number.'
          },
          isNumeric: {
            args: true,
            msg: 'Quantity Buy must be numeric.'
          }
        }
      },
      qtySold: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: 'Quantity Sold must be a positive number.'
          },
          isNumeric: {
            args: true,
            msg: 'Quantity Sold must be numeric.'
          }
        }
      },
      buyPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: 'Buy Price must be a positive number.'
          },
          isNumeric: {
            args: true,
            msg: 'Buy Price must be numeric.'
          },
          isDecimal: {
            args: true,
            msg: 'Buy Price must be a decimal'
          }
        }
      },
      sellPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: 'Sell Price must be a positive number.'
          },
          isNumeric: {
            args: true,
            msg: 'Sell Price must be numeric.'
          },
          isDecimal: {
            args: true,
            msg: 'Sell Price must be a decimal'
          }
        }
      },
      fees: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: 0,
            msg: 'Fees value must be a positive number.'
          },
          isNumeric: {
            args: true,
            msg: 'Fees value must be numeric.'
          },
          isDecimal: {
            args: true,
            msg: 'Fees value must be a decimal.'
          }
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [2, 255],
            msg: 'Comment must be between 2 and 255 characters in length'
          }
        }
      }
    },
    {}
  );
  Journals.associate = models => {
    // associations can be defined here
    Journals.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Journals;
};
