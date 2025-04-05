const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

module.exports.create = async (data) => {
  try {
    const { email } = data;
    const isExists = await UserRepository.find({ email: email });

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
      ['Something went wrong while signup'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports.getUserDetails = async (data) => {
  try {
    const user = await UserRepository.get(data);
    return user;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['User not found'], StatusCodes.NOT_FOUND);
    }
    if (error instanceof AppError) throw error;
    console.log('error', error);
    throw new AppError(
      ['Something went wrong while getting user details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports.findOne = async (data) => {
  try {
    const user = await UserRepository.find({ email: data });
    return user;
  } catch (error) {
    console.log('error in findone', error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['User not found'], StatusCodes.NOT_FOUND);
    }
    if (error instanceof AppError) throw error;
    console.log('error', error);
    throw new AppError(
      ['Something went wrong while getting user details'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports.generateTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new AppError(
      ['Something went wrong while sign in'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
