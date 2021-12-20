const bcrypt = require("bcrypt");

const models = require("../models");

const jwt = require("jsonwebtoken");

const maskData = require("maskdata");

// masquage des emails

const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 1,
  unmaskedEndCharactersAfterAt: 257,
  maskAtTheRate: false,
};

// masquage des mots de passe

const passwordMaskOptions = {
  maskWith: "*",
  maxMaskedCharacters: 20,
  unmaskedStartCharacters: 0,
  unmaskedEndCharacters: 0,
};

// logique des routes d inscription et de connexion utilsateurs

exports.signup = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const User = await models.User.create({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    pseudo: req.body.pseudo,
    password: hash,
    isAdmin: false,
  });
  res.status(201).json({ message: "Utilisateur créé !" });
};

exports.login = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            user,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.delete = (req, res) => {
  try {
    models.User.destroy({ where: { id: req.params.id } })
      .then((user) => {
        console.log("Utilisateur supprimé");
        res.status(200).json(user);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.me = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  models.User.findByPk(userId)
    .then((user) =>
      res.status(200).json({
        ...user.dataValues,
        email: maskData.maskEmail2(user.dataValues.email, emailMaskOptions),
        password: maskData.maskPassword(
          user.dataValues.password,
          passwordMaskOptions
        ),
      })
    )
    .catch((error) => res.status(400).json({ error }))
    .catch((error) => res.status(500).json(error));
};

exports.getAllUsers = (req, res) => {
  try {
    models.User.findAll({ include: { model: models.Post } })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.editUser = async (req, res) => {
  console.log(req.body);
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
      }
    : { ...req.body };
  console.log(userObject, req.params.id);
  if (userObject.password) {
    userObject.password = await bcrypt.hash(userObject.password, 10);
  }
  models.User.update({ ...userObject }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
    .catch((error) => res.status(400).json({ error }))
    .catch((error) => res.status(500).json(error));
};
