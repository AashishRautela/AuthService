const CrudRepository = require('./crud.repository.js');
const { User, Role } = require('../models');
const AppError = require('../utils/errors/appError.js');
const { StatusCodes } = require('http-status-codes');
const { ADMIN } = require('../utils/common').Enums.ROLES;
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async createUser(data, transaction) {
    const response = await User.create(data, { transaction: transaction });
    return response;
  }

  async ifUserExists(data) {
    const response = await this.model.findOne({
      where: {
        ...data
      }
    });
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data, {
      attributes: [
        'email',
        'id',
        'createdAt',
        'firstName',
        'lastName',
        'profileColor'
      ]
    });
    if (!response) {
      throw new AppError(['Resouce Not found'], StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async isAdmin(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(['User not found'], StatusCodes.NOT_FOUND);
    }
    const role = await Role.findOne({
      where: {
        name: ADMIN
      }
    });

    if (!role) {
      throw new AppError(['Role not found'], StatusCodes.NOT_FOUND);
    }
    return user.hasRole(role);
  }
}

module.exports = new UserRepository();
