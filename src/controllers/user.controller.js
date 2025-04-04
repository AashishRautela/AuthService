const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

module.exports.signUp = async (req, res) => {
  try {
    const user = await UserService.create(req.body);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};
