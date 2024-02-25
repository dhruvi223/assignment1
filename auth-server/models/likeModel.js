const { DataTypes } = require("sequelize");

//title, description,image, category
module.exports = (sequelize, DataTypes) => {
   const LikedProduct = sequelize.define('likedProduct', {
    //  username: {
    //    type: DataTypes.STRING,
    //    allownull: false
    //  },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pid:{ type: DataTypes.INTEGER,
      allowNull: false
    }
    });
    return LikedProduct;
}