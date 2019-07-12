const express = require('express');
const projectRouter = require("./project.js");
const actionsRouter = require("./actions.js");
const server = express();


server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to Justin's Challenge!</h2>
            <h5>Type /project/:id for a Project</h5>
            <h5>Type /project/:id/actions for Actions of a specific project_id</h5>`)
});

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`)

  next();
};

server.use(logger);

server.use("/project", projectRouter)

server.use("/actions", actionsRouter)

module.exports = server;