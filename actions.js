const express = require('express');

const dbActions = require("./data/helpers/actionModel");

// const dbProjects = require("./data/helpers/projectModel.js");

const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id

    dbActions
    .get(id)
    .then(action => {
        if(action){
        res.status(200).json(action)
        } else {
            res.status(404).json({error: "Does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


router.put("/:id", (req, res) => {
    const id = req.params.id
    const newAction = req.body

    dbActions
    .update(id, newAction)
    .then(action => {
        res.status(202).json(action)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    dbActions
    .remove(id)
    .then(() => {
       res.status(204).end()
    })
    .catch(error => {
        res.status(500).json(error)
    }) 
})

module.exports = router