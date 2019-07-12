const express = require('express');

const dbProjects = require("./data/helpers/projectModel");

const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id

    dbProjects
    .get(id)
    .then(project => {
        if(project){
        res.status(200).json(project)
        } else {
            res.status(404).json({error: "Does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post("/", (req, res) => {
    const project = req.body

    dbProjects
    .insert(project)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router