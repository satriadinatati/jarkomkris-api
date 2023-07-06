dataGempa = [
    {
        name: "Gpid patmos Jonooge di sidera",
        address: "Desa sidera bagian atas kecamatan Sigibiromaru kabupaten Sigi",
        distanceToEarthquake: "180.9 KM"
    },
    {
        name: "Gereja Kristen Oikumene Yerusalem ",
        address: "Jl. Purnawirawan No.6, Tatura Sel., Kec. KotaPaluSel., Kota KotaPalu, Sulawesi Tengah 94111",
        distanceToEarthquake: "260.2 KM"
    }
]

require("dotenv").config();
let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {
            name: String,
            address: String,
            distanceToEarthquake: String
        },
        {
            typeKey: "$type"
        }
    );
    
    let Gempa = mongoose.model("gempa", schema, "gempa");
    
    dataGempa.forEach(dataEarthquake => {
        let gempa = new Gempa({
            name: dataEarthquake.name,
            address: dataEarthquake.address,
            distanceToEarthquake: dataEarthquake.distanceToEarthquake
        });

        gempa.save(function(err, gempa) {
            if (err) console.log(err);
            console.log("Data Gempa succesfully stored on database!");
        });
    });
});