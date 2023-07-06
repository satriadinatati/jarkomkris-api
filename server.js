require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const listEndpoints = require("express-list-endpoints");

const app = express();
// configure Express to add headers stating any incoming API request from other origins
// enable CORS for all requests
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: db.database
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require("./app/routes/routes")(app);

// List all endpoints
app.get("/", (req, res) => {
    const endpoints = listEndpoints(app);
    res.json(endpoints);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.PTB_BASE_URL} port ${PORT}.`);
});
