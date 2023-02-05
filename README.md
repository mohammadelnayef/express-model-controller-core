# express-model-controller-core

<img src="https://www.bairesdev.com/wp-content/uploads/2021/07/Expressjs.svg"  width="40%" height="30%">

This is a Node.js + Express model-controller architecture template.

### How to install:
1. Make sure you have Node.js & npm installed on your machine.
2. In the root of this folder run "npm install" command in order to download all the dependencies.
3. Make sure port 3003 is not used by another app on your machine, or edit the port in /src/utils/constants.
4. Run the command npm run dev.
5. Open the browser or send a GET request to http://localhost:3003/example/show .

### How it works:
The entry point in this app is the /src/server.js file. This file bootstraps the app and is responsible for incoming requests on port 3003

```javascript
const app = require('./app')
const constants = require("./utils/constants");

app.listen(constants.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on requests on PORT: ", constants.PORT);
});
```

The /src/app.js file imports express, cors middleware and more dependencies.
As you can see bellow, we pass to the app.use(), the api module that comes from /src/routes/api.js.
The api.js is the file that handles requests to the / (root endpoint) and includes other routers.


```javascript
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
```

This is the api.js, here we handle the / requests, and include other routers. As you can see we use the exampleRouter for any incoming requests to /example endpoint.
```javascript
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
```

The exampleRouter comes from /src/routes/example.router.js. Here we handle requests to /example and to /example/show.
In the /example endpoint we just return a json response with a message. In the /example/show we pass the request to the exampleController and getProcessedData method.

```javascript
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
```

The exampleController comes from the /src/controllers/example.controller.js file. Here we import the example model that fetches some data from an external api, and we also import process-data.service file that handles the business logic.
After the process-data.service is done, we then return a json response with the result. Here we handle the control back to express and the request should be finalised. 

```javascript
const {fetchData} = require("../models/example.model");
const dataService = require("../services/process-data.service");
const path = 'https://jsonplaceholder.typicode.com/users';

const getProcessedData = async (req, res) => {
    const apiData = await fetchData(path);
    const result = dataService.processData(apiData);
    res.json(result);
}

module.exports = {
    getProcessedData
}
```

