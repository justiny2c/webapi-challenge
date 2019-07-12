const express = require('express');
const projectRouter = require("./project.js");
// const postRouter = require("./posts/postRouter.js");
const server = express();


server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Welcome!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`)

  next();
};

server.use(logger);

server.use("/project", projectRouter)

// server.use("/actions", postRouter)

module.exports = server;