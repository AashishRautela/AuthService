const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

module.exports.create = async (data) => {
  try {
    const { email } = data;
    const isExists = await UserRepository.find({ email: email });
    console.log('isExists', isExists);

    if (isExists) {
      throw new AppError(
        ['User exists with same user email'],
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await UserRepository.create(data);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log('error', error);
    throw new AppError(
      ['Something went wrong while creating booking'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
