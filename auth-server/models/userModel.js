const { DataTypes } = require("sequelize");

//title, description,image, category
module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('user', {
    //  username: {
    //    type: DataTypes.STRING,
    //    allownull: false
    //  },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password:{ type: DataTypes.STRING,
      allowNull: false
    },
      role: {type: DataTypes.STRING}
    });
    return User;
}