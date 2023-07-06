const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url;
db.database = dbConfig.database;
db.imgBucket = dbConfig.imgBucket;
db.church = require("./church")(mongoose);
db.faq = require("./faq")(mongoose);
db.article = require("./article")(mongoose);
db.weather = require("./weather")(mongoose);
db.dashboard = require("./dashboard")(mongoose);
db.overview = require("./overview")(mongoose);
db.gempa = require("./gempa")(mongoose);
db.chart = require("./chart")(mongoose);
db.total = require("./total")(mongoose);
db.vaccine = require("./vaccine")(mongoose);
db.covid = require("./covid19")(mongoose);
db.user = require("./user")(mongoose);

module.exports = db;