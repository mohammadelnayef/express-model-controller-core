const app = require('./app')
const constants = require("./utils/constants");

app.listen(constants.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on requests on PORT: ", constants.PORT);
});

