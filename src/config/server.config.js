const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET_EXPIRE: process.env.REFRESH_TOKEN_SECRET_EXPIRE
};
