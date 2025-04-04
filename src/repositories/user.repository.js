const CrudRepository = require('./crud.repository.js');
const { User } = require('../models');
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
}

module.exports = new UserRepository();
