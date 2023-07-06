dataTotal = {
    totalHurricane: 22,
    totalWildfire: 2,
    totalDryness: 15,
    totalFlood: 12
}

require("dotenv").config();
let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {            
            totalHurricane: Number,
            totalWildfire: Number,
            totalDryness: Number,
            totalFlood: Number
        },
        {
            typeKey: "$type"
        }
    );

    let Total = mongoose.model("total", schema, "total");

    let total = new Total({
        totalHurricane: dataTotal.totalHurricane,
        totalWildfire: dataTotal.totalWildfire,
        totalDryness: dataTotal.totalDryness,
        totalFlood: dataTotal.totalFlood
    })

    total.save(function(err, total){
        if (err) console.log(err);
        console.log("Data total prakiraan cuaca successfully stored on database!")
    })
});