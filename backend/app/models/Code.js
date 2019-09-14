module.exports = (sequelize, type) => {
  const Codes = sequelize.define('codes', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    image: type.STRING
  }, { timestamps: false });

  Codes.associate = (models) => {
    Codes.belongsToMany(models.users, {
      through: 'users_codes',
      as: 'codeUsers',
      foreignKey: 'user_id'
    });
  };
  return Codes;
}
