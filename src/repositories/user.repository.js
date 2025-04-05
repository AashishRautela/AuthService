const CrudRepository = require('./crud.repository.js');
const { User } = require('../models');
const AppError = require('../utils/errors/appError.js');
const { StatusCodes } = require('http-status-codes');
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async get(data) {
    const response = await this.model.findByPk(data, {
      attributes: [
        'email',
        'id',
        'role',
        'createdAt',
        'firstName',
        'profileColor'
      ]
    });
    if (!response) {
      throw new AppError(['Resouce Not found'], StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

module.exports = new UserRepository();
