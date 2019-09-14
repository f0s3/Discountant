module.exports = (sequelize, DataTypes) => {
  const UsersCodes = sequelize.define('users_codes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    code_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'codes',
        key: 'id'
      }
    }
  }, { timestamps: false });
  return UsersCodes;
};
