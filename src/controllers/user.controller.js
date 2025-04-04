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
    const { email, password } = req.body;

    const user = await UserRepository.find({ email: email });
    console.log('user', user);
    if (await user.validatePassword(password)) {
      return res.send('ok');
    } else {
      return res.send('no');
    }
  } catch (error) {
    console.log('error', error);
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
};
