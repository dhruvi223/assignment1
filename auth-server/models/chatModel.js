const { DataTypes } = require("sequelize");

//title, description,image, category
module.exports = (sequelize, DataTypes) => {
   const Chat = sequelize.define('chats', {
    //  username: {
    //    type: DataTypes.STRING,
    //    allownull: false
    //  },
    MessageID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //autoIncrement: true
      },
      SenderID:{ type: DataTypes.INTEGER,
      allowNull: false,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   }
    },
    message:{ type: DataTypes.STRING,
        
      },
    ReceiverID: {type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //     model: 'users',
    //     key: 'id'
    //   }
}
    });
    return Chat;
}