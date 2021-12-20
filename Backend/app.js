// variables de stockage module npm

const express = require("express");

const path = require("path");

const cors = require("cors");

const userRoutes = require("./routes/user");

const postRoutes = require("./routes/post");

// appel d express dans l'application

const app = express();

app.use(express.json());

app.use(cors());

// gère les images dans le fichier

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

module.exports = app;
