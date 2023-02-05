const express = require('express')
const cors = require('cors')
const api = require('./routes/api')
const constants = require("./utils/constants");

const app = express()

app.use(cors({
    origin: `http://localhost:${constants.PORT}`
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', api)

module.exports = app
