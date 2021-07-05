const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

class User extends Model {}
User.init(
  {
    id: DataTypes.INTEGER,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

module.exports = User;