module.exports = (sequelize, type) => {
  const Users = sequelize.define('users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    password: type.STRING
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.belongsToMany(models.codes, {
      through: 'users_codes',
      as: 'userCodes',
      foreignKey: 'code_id'
    });
  };
  return Users;
}

