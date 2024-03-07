const { DataTypes } = require("sequelize");

// defined a model for users table
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
  });
  return User;
};
