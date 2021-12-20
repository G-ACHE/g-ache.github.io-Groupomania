const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

function User(connection) {
  const user = connection.define("User", {
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    avatar: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  return user;
}

module.exports = User;
