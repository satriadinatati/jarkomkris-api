dataChart = [
    {
        province: "Daerah Istimewa Yogyakarta",
        notReady: 9,
        readyEnough: 31,
        ready: 26,
        veryReady: 3
    },
    {
        province: "Sulawesi Tengah",
        notReady: 9,
        readyEnough: 24,
        ready: 30,
        veryReady: 1
    }
]

require("dotenv").config();
let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {
            province: String,
            notReady: Number,
            readyEnough: Number,
            ready: Number,
            veryReady: Number
        },
        {
            typeKey: "$type"
        }
    );
    
    let Chart = mongoose.model("chart", schema, "chart");
    
    dataChart.forEach(chartData => {
        let chart = new Chart({
            province: chartData.province,
            notReady: chartData.notReady,
            readyEnough: chartData.readyEnough,
            ready: chartData.ready,
            veryReady: chartData.veryReady
        });

        chart.save(function(err, chart) {
            if (err) console.log(err);
            console.log("Data chart successfully stored on database!");
        });
    });
});