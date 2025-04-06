'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { Enums } = require('../utils/common');
const { ROLES } = require('../utils/common/enum');
const { generateRandomColorLight } = require('../utils/helpers');
const { ADMIN, USER, SUPERADMIN } = Enums.ROLES;
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET_EXPIRE
} = require('../config').ServerConfig;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    async validatePassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    async generateAccessToken() {
      const token = jwt.sign(
        { id: this.id, role: this.role, email: this.email },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRE }
      );
      return token;
    }

    async generateRefreshToken() {
      const token = jwt.sign(
        { id: this.id, role: this.role, email: this.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_SECRET_EXPIRE }
      );
      return token;
    }
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'User_Roles'
      });
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
      profileColor: {
        type: DataTypes.STRING,
        defaultValue: '#2EB6C9'
      },
      refreshToken: {
        type: DataTypes.STRING,
        defaultValue: ''
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true
    }
  );

  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const randomColor = await generateRandomColorLight();
    user.profileColor = randomColor;
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  return User;
};
