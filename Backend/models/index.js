const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("groupomania", "gache", "mysql", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("La connexion a été établie avec succès");
  })
  .catch(function (error) {
    console.error("Impossible de se connecter à la base de données:", error);
  });

const User = require("./user.js")(sequelize);
const Post = require("./post.js")(sequelize);
User.hasMany(Post);
Post.belongsTo(User);
const db = {};
db.User = User;
db.Post = Post;

/*Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});*/

/*(async () => {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
})();*/

module.exports = db;
