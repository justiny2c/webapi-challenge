const express = require('express');

const dbProjects = require("./data/helpers/projectModel");
const dbActions = require("./data/helpers/actionModel");

const router = express.Router();

router.get("/:id", validateProjectId, (req, res) => {
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
router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id

    dbProjects
    .getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post("/", (req, res) => {
    const project = req.body

    dbProjects
    .insert(project)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post("/:id/actions", validateProjectId, (req, res) => {
    const action = req.body

    dbActions
    .insert(action)
    .then(actions => {
        res.status(201).json(actions)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.put("/:id", validateProjectId, (req, res) => {
    const id = req.params.id
    const newProject = req.body

    dbProjects
    .update(id, newProject)
    .then(project => {
        res.status(202).json(project)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    dbProjects
    .remove(id)
    .then(() => {
       res.status(204).end()
    })
    .catch(error => {
        res.status(500).json(error)
    }) 
})

function validateProjectId(req, res, next) {    
    dbProjects
    .get(req.params.id)
    .then(project => {
        if(project){
            next();
        } else {
            res.status(400).json({ message: "Project ID does not exist" })
        }
        })
    .catch(error => {
        res.status(500).json(error)
    })
};


module.exports = router