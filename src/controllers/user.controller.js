const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { UserRepository } = require('../repositories');

module.exports.signUp = async (req, res) => {
  try {
    const user = await UserService.create(req.body);
    SuccessResponse.data = {};
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const user = req.user;
    const { accessToken, refreshToken } =
      await UserService.generateTokens(user);
    SuccessResponse.data = { accessToken, refreshToken };
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports.getUserDetails = async (req, res) => {
  try {
    const user = await UserService.getUserDetails(req.params.id);
    SuccessResponse.data = user;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};
