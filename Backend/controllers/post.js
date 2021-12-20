const jwt = require("jsonwebtoken");
const fs = require("fs");
const models = require("../models");

exports.getAllPosts = (req, res) => {
  try {
    models.Post.findAll({ include: { model: models.User } }).then((post) => {
      res
        .status(200)
        .json(post)
        .catch((error) => res.status(400).json(error));
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOnePost = (req, res) => {
  models.Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }))
    .catch((error) => res.status(500).json(error));
};

exports.createPost = (req, res) => {
  if (req.file) {
    req.body.file = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    req.body.file = null;
  }
  try {
    let { text, file } = req.body;
    const userId = req.token.userId;
    models.Post.create({ text, file, UserId: userId })
      .then((newPost) => {
        console.log("nouvelle publication créée");
        res.status(201).json(newPost);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.modifyPost = (req, res) => {
  const postObject = req.file
    ? {
        ...req.body,
        file: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  models.Post.update({ ...postObject }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }))
    .catch((error) => res.status(500).json(error));
};

exports.deletePost = (req, res) => {
  try {
    models.Post.destroy({ where: { id: req.params.id } })
      .then((post) => {
        console.log("Post supprimé");
        res.status(200).json(post);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
