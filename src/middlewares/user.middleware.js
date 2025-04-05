const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/appError');
const { ErrorResponse } = require('../utils/common');
const validator = require('validator');
const { UserService } = require('../service');

// validate signup
module.exports.validateSignUp = async (req, res, next) => {
  const { firstName, email, password } = req.body;

  // first check if user is sending all the data
  if (!firstName || !email || !password) {
    ErrorResponse.message = 'Something went wrong while sign up';
    ErrorResponse.error = new AppError(
      ['Request data missing'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // check email
  if (!validator.isEmail(email)) {
    ErrorResponse.message = 'Something went wrong while sign up';
    ErrorResponse.error = new AppError(
      ['Please enter a valid email'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // check password
  if (password.trim().length < 6) {
    ErrorResponse.message = 'Something went wrong while sign up';
    ErrorResponse.error = new AppError(
      ['Password must be atleast 6 characters'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
};

// validate signin
module.exports.validateSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  // first check if user is sending all the data
  if (!email || !password) {
    ErrorResponse.message = 'Something went wrong while sign up';
    ErrorResponse.error = new AppError(
      ['Request data missing'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  let user;
  try {
    user = await UserService.findOne(email);
  } catch (error) {
    ErrorResponse.message = 'Something went wrong while sign up';
    ErrorResponse.error = new AppError(
      ['User not found'],
      StatusCodes.NOT_FOUND
    );
    return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
  }

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    ErrorResponse.message = 'Something went wrong while sign up';
    ErrorResponse.error = new AppError(
      ['Incorrect Password'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  req.user = user;
  next();
};
