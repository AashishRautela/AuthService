'use strict';
const { Model } = require('sequelize');
const bcrpyt = require('bcrypt');
const { Enums } = require('../utils/common');
const { ROLES } = require('../utils/common/enum');
const { ADMIN, USER, SUPERADMIN } = Enums.ROLES;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    async validatePassword(password) {
      return await bcrpyt.compare(password, this.password);
    }
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 30]
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: USER,
        values: [ADMIN, SUPERADMIN, USER],
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true
    }
  );

  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrpyt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return User;
};
