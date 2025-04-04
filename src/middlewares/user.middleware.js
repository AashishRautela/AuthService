const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/appError');
const { ErrorResponse } = require('../utils/common');
const validator = require('validator');

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
