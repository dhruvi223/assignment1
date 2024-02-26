// chat table for saving chats
const { DataTypes } = require("sequelize");
// defined a model for chats table
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("chats", {

    MessageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SenderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: { type: DataTypes.STRING },
    ReceiverID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Chat;
};
