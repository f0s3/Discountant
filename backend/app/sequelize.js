const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@localhost:3306/discountant');

const UserModel = require('./models/User');
const CodeModel = require('./models/Code');
const UsersCodesModel = require('./models/usersCodes');

const User = UserModel(sequelize, Sequelize);
const Code = CodeModel(sequelize, Sequelize);
const UsersCodes = UsersCodesModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Code,
  UsersCodes
}
