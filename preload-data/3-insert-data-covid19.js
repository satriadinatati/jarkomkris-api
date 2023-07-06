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
            provinsi: String,
            dirawat: Number,
            kasus: String,
            sembuh: String,
            meninggal: String,
            penambahan: {
                pPositif: Number,
                pSembuh: Number,
                pMeninggal: Number 
            },
            kelompok_umur_anak: Number,
            kelompok_umur_remaja: Number,
            kelompok_umur_dewasa: Number,
            kelompok_umur_tua: Number,
            kelompok_umur_lansia: Number,
            kelompok_umur_lanjut: Number,
            last_date: String  
        },
        {
            typeKey: "$type"
        }
    );

    let lihatURL = async () => {
        fs.createReadStream(
            path.resolve(__dirname, '../app', 'assets', 'Covid-19.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', function(row) {
                let Covid = mongoose.model("covid", schema, "covid");
                
                let covid = new Covid({                    
                    type: 'Feature',                    
                    provinsi: row['provinsi'],
                    dirawat: row['dirawat'],
                    kasus: row['kasus'],
                    sembuh: row['sembuh'],
                    meninggal: row['meninggal'],
                    penambahan: {
                        pPositif: row['penambahan.positif'],
                        pSembuh: row['penambahan.sembuh'],
                        pMeninggal: row['penambahan.meninggal'] 
                    },
                    kelompok_umur_anak: row['kelompok_umur_anak'],
                    kelompok_umur_remaja: row['kelompok_umur_remaja'],
                    kelompok_umur_dewasa: row['kelompok_umur_dewasa'],
                    kelompok_umur_tua: row['kelompok_umur_tua'],
                    kelompok_umur_lansia: row['kelompok_umur_lansia'],
                    kelompok_umur_lanjut: row['kelompok_umur_lanjut'],
                    last_date: row['last_date']  
                });
    
                covid.save(function(err, covid) {
                    if (err) console.log(err);
                    // // console.log(church.properties.name + " successfully stored on database!");
                });
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`)
        );
    }

    lihatURL();
});