vaccineData = {
    totalsasaran: "208265720",
    sasaranvaksinsdmk: "1468764",
    sasaranvaksinlansia: "21553118",
    sasaranvaksinpetugaspublik: "141211181",
    vaksinasi1: "200629176",
    vaksinasi2: "167796320"
}

require("dotenv").config();
let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {
            totalsasaran: String,
            sasaranvaksinsdmk: String,
            sasaranvaksinlansia: String,
            sasaranvaksinpetugaspublik: String,
            vaksinasi1: String,
            vaksinasi2: String
        },
        {
            typeKey: "$type"
        }
    );
    
    let Vaccine = mongoose.model("vaccine", schema, "vaccine");

    let vaccine = new Vaccine({
        totalsasaran: vaccineData.totalsasaran,
        sasaranvaksinsdmk: vaccineData.sasaranvaksinsdmk,
        sasaranvaksinlansia: vaccineData.sasaranvaksinlansia,
        sasaranvaksinpetugaspublik: vaccineData.sasaranvaksinpetugaspublik,
        vaksinasi1: vaccineData.vaksinasi1,
        vaksinasi2: vaccineData.vaksinasi2
    });

    vaccine.save(function(err, vaccine) {
        if (err) console.log(err);
        console.log("Data vaccine successfully stored on database!");
    })
});