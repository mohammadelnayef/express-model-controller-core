const exampleRouter = require("./example.router");
const { Router } = require('express');

const api = Router();

// Root endpoint
api.get('/', (req, res) => {
    res.json({message:'This is the root.'})
});

// All endpoints
api.use('/example', exampleRouter);

module.exports = api