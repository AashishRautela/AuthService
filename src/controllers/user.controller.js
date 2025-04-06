const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

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

module.exports.isAuthenticated = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await UserService.isAuthenticated(token);

    SuccessResponse.data = response;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};

module.exports.isAdmin = async (req, res) => {
  try {
    const isAdmin = await UserService.isAdmin(req.params.id);
    SuccessResponse.data = isAdmin;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};
