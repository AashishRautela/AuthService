const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/server.config');

module.exports.create = async (data) => {
  try {
    const { email } = data;
    const isExists = await UserRepository.ifUserExists({ email: email });

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

module.exports.isAuthenticated = async (data) => {
  try {
    const response = veriyToken(data);

    if (!response) {
      throw new AppError(['Invalid token'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const user = await UserRepository.get(response.id);
    return user?.id;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(['User not found'], StatusCodes.NOT_FOUND);
    }

    if (error instanceof AppError) throw error;
    throw new AppError(
      ['Something went wrong while sign in'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports.isAdmin = async (userId) => {
  try {
    const isAdmin = await UserRepository.isAdmin(userId);
    return isAdmin;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      ['Something went wrong checking user role'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
function veriyToken(token) {
  try {
    const response = jwt.verify(token, JWT_SECRET);
    return response;
  } catch (error) {
    if (error.message == 'invalid token') {
      throw new AppError(['Invalid token'], StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ['Something went wrong while verifying token'],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
