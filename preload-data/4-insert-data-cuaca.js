require("dotenv").config();
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {            
            type: String,
            name: String,
            weather: String,
            badge: String,
            humidity: String,
            wind: String,
            disasterPotential: String            
        },
        {
            typeKey: "$type"
        }
    );

    let lihatURL = async () => {
        fs.createReadStream(
            path.resolve(__dirname, '../app', 'assets', 'Data_PrakiraanCuaca.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', function(row) {
                let Weather = mongoose.model("weather", schema, "weathers");
                
                let weather = new Weather({                    
                    type: 'Feature',                    
                    name: row['name'],
                    weather: row['weather'],
                    badge: row['badge'],
                    humidity: row['humidity'],
                    wind: row['wind'],
                    disasterPotential: row['disasterPotential']
                });
    
                weather.save(function(err, weather) {
                    // if (err) console.log(err);
                    // // console.log(church.properties.name + " successfully stored on database!");
                });
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`)
        );
    }

    lihatURL();
});