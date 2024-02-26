const { DataTypes } = require("sequelize");

// defined a model for likedProduct table
module.exports = (sequelize, DataTypes) => {
  const LikedProduct = sequelize.define("likedProduct", {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pid: { type: DataTypes.INTEGER, allowNull: false },
  });
  return LikedProduct;
};
