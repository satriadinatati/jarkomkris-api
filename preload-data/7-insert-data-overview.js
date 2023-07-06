overviewData = {
    totalCongregation: 80.334,
    totalCovid: 281.367,
    totalEarthquake: 2,
    churchPreparedness: 20,
    numberIndicators: 14,
    churchBuilding: 112,
    churchAwareness: 103,
    churchTeam: 118
}

require("dotenv").config();
let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {            
            totalCongregation: Number,
            totalCovid: Number,
            totalEarthquake: Number,
            churchPreparedness: Number,
            numberIndicators: Number,
            churchBuilding: Number,
            churchAwareness: Number,
            churchTeam: Number
        },
        {
            typeKey: "$type"
        }
    );

    let Overview = mongoose.model("overview", schema, "overview");

    let overview = new Overview({
        totalCongregation: overviewData.totalCongregation,
        totalCovid: overviewData.totalCovid,
        totalEarthquake: overviewData.totalEarthquake,
        churchPreparedness: overviewData.churchPreparedness,
        numberIndicators: overviewData.numberIndicators,
        churchBuilding: overviewData.churchBuilding,
        churchAwareness: overviewData.churchAwareness,
        churchTeam: overviewData.churchTeam
    })

    overview.save(function(err, overview){
        if (err) console.log(err);
        console.log("Data Overview successfully stored on database!")
    })
});