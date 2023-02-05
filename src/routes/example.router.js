const exampleController = require("../controllers/example.controller");
const { Router } = require('express')

const exampleRouter = Router()

// This gets called on /example.
exampleRouter.get('/', (req, res) => {
    res.json({message:"Root of example endpoint."});
});

// This gets called on /example/show.
exampleRouter.get('/show', exampleController.getProcessedData);

module.exports = exampleRouter

