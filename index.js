const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const routes = require('./src/routes.js')
require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGODB_DB_NAME
    }
);

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})