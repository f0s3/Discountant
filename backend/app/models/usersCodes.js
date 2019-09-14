module.exports = (sequelize, DataTypes) => {
  const UsersCodes = sequelize.define('users_codes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    groupId: {
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
