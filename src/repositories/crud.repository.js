const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/appError');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async bulkCreate(data, options = {}) {
    return await this.model.bulkCreate(data, options);
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data
      }
    });
    if (!response) {
      throw new AppError(['Resouce Not found'], StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(['Resouce Not found'], StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id
      }
    });
    if (!response[0]) {
      throw new AppError(['Resouce Not found'], StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async find(data) {
    const response = await this.model.findOne({
      where: {
        ...data
      }
    });

    if (!response) {
      throw new AppError(['Resouce Not found'], StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

module.exports = CrudRepository;
