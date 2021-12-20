const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

function Post(connection) {
  const post = connection.define("post", {
    text: DataTypes.STRING,
    file: DataTypes.STRING,
  });

  return post;
}
module.exports = Post;
