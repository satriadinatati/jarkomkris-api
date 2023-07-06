alertLevel = [
    {
        color: "Merah",
        meaning: "risiko sangat tinggi"
    },
    {
        color: "Oranye",
        meaning: "risiko tinggi"
    },
    {
        color: "Kuning",
        meaning: "risiko sedang"
    },
    {
        color: "Hijau",
        meaning: "risiko rendah"
    }
];

disasters = [
    "Gempa", "Banjir", 
    "Kekeringan", "Tsunami", 
    "Cuaca Ekstrim", "Gelombang Ekstrim dan Abrasi", 
    "Kebakaran Hutan dan Lahan", "Letusan Gunung Berapi", 
    "Tanah Longsor", "Multi Bahaya", 
    "Terorisme", "Likuefaksi", 
    "Terorisme", "Konflik"
];

disaster = {
    name: "Gempa",
    alertLevel: {
        color: "Merah",
        meaning: "risiko sangat tinggi"
    }
};

/* Contoh: Schema (Lama)
{
    type: "Feature",
    properties: {
        name: "Gereja Kibaid Jemaat Palu",
        address: "Jln. Gereja No 13",
        disasterRisks: [
            {
                name: "Gempa",
                alertLevel: {
                    color: "Merah",
                    meaning: "risiko sangat tinggi"
                }
            },
            {
                name: "Banjir",
                alertLevel: {
                    color: "Hijau",
                    meaning: "risiko rendah"
                }
            },
            {
                name: "Cuaca Ekstrim",
                alertLevel: {
                    color: "Oranye",
                    meaning: "risiko tinggi"
                }
            }
        ]
    },
    geometry: {
        type: "Point",
        coordinates: [-0.90895, 119.8854]
    }
}

Contoh: Schema */
let gereja = {
    type: "Feature",
    properties: {
        name: "Gereja Kibaid Jemaat Palu",
        address: "Jln. Gereja No 13",
        disasterRisks: [
            {
                name: "Gempa",
                alertLevel: {
                    color: "Merah",
                    meaning: "risiko sangat tinggi"
                }
            },
            {
                name: "Banjir",
                alertLevel: {
                    color: "Hijau",
                    meaning: "risiko rendah"
                }
            },
            {
                name: "Cuaca Ekstrim",
                alertLevel: {
                    color: "Oranye",
                    meaning: "risiko tinggi"
                }
            }
        ]
    },
    geometry: {
        type: "Point",
        coordinates: [-0.90895, 119.8854]
    }
}
/*
Asal Gereja,Alamat Gereja,Gempa,Banjir,Kekeringan,Tsunami,Cuaca Ekstrim,Gelombang Ekstrim dan Abrasi,Kebakaran Hutan dan Lahan,Letusan Gunung Berapi,Tanah Longsor,Multi Bahaya,Likuifaksi,Terorisme,Konflik
Gereja Kibaid Jemaat Palu,Jln. Gereja No 13,Merah,Hijau,Hijau,Hijau,Oranye,Hijau,Hijau,Hijau,Hijau,Merah,Hijau,Oranye,Oranye
Gereja Dome of Bethany Jemaat Palu,Jl. Sulawesi no 391 kota palu,Merah,Hijau,Hijau,Hijau,Oranye,Hijau,Hijau,Hijau,Hijau,Merah,Oranye,Oranye,Oranye
*/


require("dotenv").config();
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

// let alertLevelMeaning = (kategoriBencana) => {
//     return (kategoriBencana === 'Merah') ? "risiko sangat tinggi":
//         (kategoriBencana === 'Oranye') ? "risiko tinggi": 
//         (kategoriBencana === 'Kuning') ? "risiko sedang":
//         (kategoriBencana === 'Hijau') ? "risiko rendah": false
// }

let alertLevelMeaning = (kategoriBencana) => {
    return (kategoriBencana.toLowerCase() === 'red') ? "risiko sangat tinggi":
        (kategoriBencana.toLowerCase() === 'orange') ? "risiko tinggi": 
        (kategoriBencana.toLowerCase() === 'yellow') ? "risiko sedang":
        (kategoriBencana.toLowerCase() === 'green') ? "risiko rendah": false
}

// ===== ===== Church Map ===== =====
// db.once('open', function() {
//     let schema = new mongoose.Schema(
//         {
//             type: String,
//             properties: {
//                 name: String,
//                 address: String,
//                 disasterRisks: []
//             },
//             geometry: {
//                 type: String,
//                 coordinates: []
//             },
//         },
//         {
//             typeKey: "$type"
//         }
//     );

//     fs.createReadStream(
//         path.resolve(__dirname, 'app', 'assets', 'MappingTingkatKewaspadaan.csv'))
//         // path.resolve(__dirname, 'app', 'assets', 'MappingTingkatKewaspadaanCopy.csv')) // test insert 5 data
//         .pipe(csv.parse({ headers: true }))
//         .on('error', error => console.error(error))
//         .on('data', function(row) {
//             let Church = mongoose.model("church", schema, "churches");
            
//             let church = new Church({
//                 type: 'Feature',
//                 properties: {
//                     name: row['Asal Gereja'],
//                     address: row['Alamat Gereja'],
//                     disasterRisks: [
//                         {
//                             name: 'Gempa',
//                             alertLevel: {
//                                 color: row['Gempa'],
//                                 meaning: alertLevelMeaning(row['Gempa'])
//                             }
//                         },
//                         {
//                             name: 'Banjir',
//                             alertLevel: {
//                                 color: row['Banjir'],
//                                 meaning: alertLevelMeaning(row['Banjir'])
//                             }
//                         },
//                         {
//                             name: 'Kekeringan',
//                             alertLevel: {
//                                 color: row['Kekeringan'],
//                                 meaning: alertLevelMeaning(row['Kekeringan'])
//                             }
//                         },
//                         {
//                             name: 'Tsunami',
//                             alertLevel: {
//                                 color: row['Tsunami'],
//                                 meaning: alertLevelMeaning(row['Tsunami'])
//                             }
//                         },
//                         {
//                             name: 'Cuaca Ekstrim',
//                             alertLevel: {
//                                 color: row['Cuaca Ekstrim'],
//                                 meaning: alertLevelMeaning(row['Cuaca Ekstrim'])
//                             }
//                         },
//                         {
//                             name: 'Gelombang Ekstrim dan Abrasi',
//                             alertLevel: {
//                                 color: row['Gelombang Ekstrim dan Abrasi'],
//                                 meaning: alertLevelMeaning(row['Gelombang Ekstrim dan Abrasi'])
//                             }
//                         },
//                         {
//                             name: 'Kebakaran Hutan dan Lahan',
//                             alertLevel: {
//                                 color: row['Kebakaran Hutan dan Lahan'],
//                                 meaning: alertLevelMeaning(row['Kebakaran Hutan dan Lahan'])
//                             }
//                         },
//                         {
//                             name: 'Letusan Gunung Berapi',
//                             alertLevel: {
//                                 color: row['Letusan Gunung Berapi'],
//                                 meaning: alertLevelMeaning(row['Letusan Gunung Berapi'])
//                             }
//                         },
//                         {
//                             name: 'Tanah Longsor',
//                             alertLevel: {
//                                 color: row['Tanah Longsor'],
//                                 meaning: alertLevelMeaning(row['Tanah Longsor'])
//                             }
//                         },
//                         {
//                             name: 'Multi Bahaya',
//                             alertLevel: {
//                                 color: row['Multi Bahaya'],
//                                 meaning: alertLevelMeaning(row['Multi Bahaya'])
//                             }
//                         },
//                         {
//                             name: 'Terorisme',
//                             alertLevel: {
//                                 color: row['Terorisme'],
//                                 meaning: alertLevelMeaning(row['Terorisme'])
//                             }
//                         },
//                         {
//                             name: 'Likuefaksi',
//                             alertLevel: {
//                                 color: row['Likuefaksi'],
//                                 meaning: alertLevelMeaning(row['Likuefaksi'])
//                             }
//                         },
//                         {
//                             name: 'Terorisme',
//                             alertLevel: {
//                                 color: row['Terorisme'],
//                                 meaning: alertLevelMeaning(row['Terorisme'])
//                             }
//                         },
//                         {
//                             name: 'Konflik',
//                             alertLevel: {
//                                 color: row['Konflik'],
//                                 meaning: alertLevelMeaning(row['Konflik'])
//                             }
//                         }
//                     ]
//                 },
//                 geometry: {
//                     type: "Point",
//                     coordinates: [
//                         parseFloat(row['Longitude']), parseFloat(row['Latitude'])
//                     ]
//                 },
//             });

//             church.save(function(err, church) {
//                 if (err) // console.log(err);
//                 // console.log(church.properties.name + " successfully stored on database!");
//             });
            
//             // console.log(row);
//             // console.log(church);
//             // console.log();
//         })
//         .on('end', rowCount => // console.log(`Parsed ${rowCount} rows`)
//     );
// });

// let gereja = {
//   type: "Feature",
//   properties: {
//       name: "Gereja Kibaid Jemaat Palu",
//       address: "Jln. Gereja No 13",
//       province: "Sulawesi Tengah",
//       risks: {
//         risk_1: "Epidemi dan wabah penyakit (covid)",
//         risk_2: "Gempa Bumi",
//         risk_3: "Konflik Sosial"
//       },
//       congregation: "211",
//       preparedness: "Punya dan berfungsi",
//       emergencyResPlan: "Punya dan berfungsi",
//       warningSystem: "Tidak punya",
//       permanentBuilding: "Gedung gereja masih dalam tahap pembangunan, sehingga gedung gereja sementara dari kayu dan tripleks",
//       nonPermanentBuilding: "Ya",
//       doorWindow: "Ya",
//       buildingCode: "Ya",
//       constructionDoc: "Punya dan tersimpan dengan baik (mudah diakses)",
//       earthquakeResistant: "Ya, sudah teruji",
//       buildingEarthquakeImpact: "Tahan gempa karena sudah diuji oleh konsultan, dan gedung gereja yang dibangun memiliki struktur tahan gempa. Seperti dari rangka beton dan pondasi cakar ayam",
//       facilityEarthquakeImpact: "Tidak terdampak",
//       faciltyEndanger: "Tidak",
//       evacuationPath: "Punya, tetapi tidak diperbarui",
//       evacuationPathVulnerable: "Punya, tetapi tidak diperbarui",
//       evacuationOfficer: "Tidak punya",
//       emergencyCommission: "Tidak punya",
//       competent: "BPBD/BNPB, SAR, PMI",
//       evacuationSimulation: "Tidak",
//       preparednessTools: "Alat pengeras suara, Genset, Tenda, peralatan dapur untuk dapur umum, tempat cuci tangan",
//       facingDisasterProg: "Tidak",
//       handlingSkill: "Dana insidental kebencanaan , Dana kebencanaan rutin ",
//       dataRoutine: "Pendataan kelompok rentan (disabilitas, lansia, ibu hamil, dan anak-anak), Pendataan pekerjaan/kegiatan usaha jemaat",
//       disasterResponseSOP: "Tidak",
//       specialBudget: "Ya",
//       raiseFunds: "Keduanya (insidental dan alokasi anggaran bulanan khusus bencana)",
//       emergencyResponse: "Tidak",
//       interactionGuide: "Ya",
//       provideTraining: "Belum pernah",
//       economicDev: "Bantuan modal",
//       churchEducation: "Ibadah minggu, Sekolah Minggu",
//       riskReduction: "Khotbah, Infokus (slide berjalan), live streaming, warta jemaat",
//       disasterOccurs: "Siap",
//       trainingNeeds: "Simulasi menghadapi bencana, Sosialisasi dan pemahaman dalam menghadapi bencana, contohnya jika terjadi gempa jemaat tidak terlalu panik dan tahu apa yang harus dilakukan",
//       increaseCapacity: "Sosialisasi dan pemahaman dalam menghadapi bencana",
//       lastUpdate: "23 April 2021",
//       disasterRisks: [
//           {
//               name: "Gempa",
//               alertLevel: {
//                   color: "Merah",
//                   meaning: "risiko sangat tinggi"
//               }
//           },
//           {
//               name: "Banjir",
//               alertLevel: {
//                   color: "Hijau",
//                   meaning: "risiko rendah"
//               }
//           },
//           {
//               name: "Cuaca Ekstrim",
//               alertLevel: {
//                   color: "Oranye",
//                   meaning: "risiko tinggi"
//               }
//           }
//       ],
//   },
//   geometry: {
//       type: "Point",
//       coordinates: [-0.90895, 119.8854]
//   }
// }

// ===== ===== Detail Church Palu ===== =====
db.once('open', function() {
    let schema = new mongoose.Schema(
        {
            type: String,
            properties: {
                name: String,
                address: String,
                province: String,
                congregation: String,
                risks: {
                    risk_1: String,
                    risk_2: String,
                    risk_3: String
                },
                preparedness: String,
                emergencyResPlan: String,
                warningSystem: String,
                permanentBuilding: String,
                nonPermanentBuilding: String,
                doorWindow: String,
                buildingCode: String,
                constructionDoc: String,
                earthquakeResistant: String,
                buildingEarthquakeImpact: String,
                facilityEarthquakeImpact: String,
                faciltyEndanger: String,
                evacuationPath: String,
                evacuationPathVulnerable: String,
                evacuationOfficer: String,
                emergencyCommission: String,
                competent: String,
                evacuationSimulation: String,
                preparednessTools: String,
                facingDisasterProg: String,
                handlingSkill: String,
                dataRoutine: String,
                disasterResponseSOP: String,
                specialBudget: String,
                raiseFunds: String,
                emergencyResponse: String,
                interactionGuide: String,
                provideTraining: String,
                economicDev: String,
                churchEducation: String,
                riskReduction: String,
                disasterOccurs: String,
                trainingNeeds: String,
                increaseCapacity: String,
                lastUpdate: String,
                disasterRisks: [],
                churchImage: String
            },
            geometry: {
                type: String,
                coordinates: []
            }
        },
        {
            typeKey: "$type"
        }
    );

    const images = db.collection("images" + ".files");
    let cursor = images.find({});
    let listImageOnDatabaseURL = [];
    let lihatURL = async () => {
        await cursor.forEach((doc) => {
            listImageOnDatabaseURL.push(process.env.PTB_BASE_URL + "/api/files/" + doc.filename);
        });
        // console.log(listImageOnDatabaseURL);

        function checkImage(namaGereja) {
            let result;
            for (let idx = 0; idx < listImageOnDatabaseURL.length; idx++) {
                const imageURL = listImageOnDatabaseURL[idx];
                if(imageURL.includes(namaGereja)) {
                    result = imageURL;
                    break;
                } else {
                    result = process.env.PTB_DEFAULT_CHURCH_IMAGE_URL;
                }
            }
            return result;
        }
        // // console.log("IMAGE URL: \n\t", checkImage("Kibaid Jemaat Palu"));
        // // console.log("IMAGE URL: \n\t", checkImage("GBI Woodward Palu"));

        fs.createReadStream(
            path.resolve(__dirname, 'app', 'assets', 'DetailGereja-Palu.csv'))
            // path.resolve(__dirname, 'app', 'assets', 'MappingTingkatKewaspadaanCopy.csv')) // test insert 5 data
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', function(row) {
                let Church = mongoose.model("church", schema, "churches");
                
                let church = new Church({
                    type: 'Feature',
                    properties: {
                        name: row['name'],
                        address: row['address'],
                        province: row['province'],
                        congregation: row['congregation'],
                        risks: {
                            risk_1: row['risk_1'],
                            risk_2: row['risk_2'],
                            risk_3: row['risk_3']
                        },
                        preparedness: row['preparedness'],
                        emergencyResPlan: row['emergencyResPlan'],
                        warningSystem: row['warningSystem'],
                        permanentBuilding: row['permanentBuilding'],
                        nonPermanentBuilding: row['nonPermanentBuilding'],
                        doorWindow: row['doorWindow'],
                        buildingCode: row['buildingCode'],
                        constructionDoc: row['constructionDoc'],
                        earthquakeResistant: row['earthquakeResistant'],
                        buildingEarthquakeImpact: row['buildingEarthquakeImpact'],
                        facilityEarthquakeImpact: row['facilityEarthquakeImpact'],
                        faciltyEndanger: row['faciltyEndanger'],
                        evacuationPath: row['evacuationPath'],
                        evacuationPathVulnerable: row['evacuationPathVulnerable'],
                        evacuationOfficer: row['evacuationOfficer'],
                        emergencyCommission: row['emergencyCommission'],
                        competent: row['competent'],
                        evacuationSimulation: row['evacuationSimulation'],
                        preparednessTools: row['preparednessTools'],
                        facingDisasterProg: row['facingDisasterProg'],
                        handlingSkill: row['handlingSkill'],
                        dataRoutine: row['dataRoutine'],
                        disasterResponseSOP: row['disasterResponseSOP'],
                        specialBudget: row['specialBudget'],
                        raiseFunds: row['raiseFunds'],
                        emergencyResponse: row['emergencyResponse'],
                        interactionGuide: row['interactionGuide'],
                        provideTraining: row['provideTraining'],
                        economicDev: row['economicDev'],
                        churchEducation: row['churchEducation'],
                        riskReduction: row['riskReduction'],
                        disasterOccurs: row['disasterOccurs'],
                        trainingNeeds: row['trainingNeeds'],
                        increaseCapacity: row['increaseCapacity'],
                        lastUpdate: row['lastUpdate'],
                        disasterRisks: [
                            {
                                name: 'Gempa',
                                alertLevel: {
                                    color: row['Gempa'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Gempa'])
                                }
                            },
                            {
                                name: 'Banjir',
                                alertLevel: {
                                    color: row['Banjir'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Banjir'])
                                }
                            },
                            {
                                name: 'Kekeringan',
                                alertLevel: {
                                    color: row['Kekeringan'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Kekeringan'])
                                }
                            },
                            {
                                name: 'Tsunami',
                                alertLevel: {
                                    color: row['Tsunami'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Tsunami'])
                                }
                            },
                            {
                                name: 'Cuaca Ekstrim',
                                alertLevel: {
                                    color: row['Cuaca Ekstrim'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Cuaca Ekstrim'])
                                }
                            },
                            {
                                name: 'Gelombang Ekstrim dan Abrasi',
                                alertLevel: {
                                    color: row['Gelombang Ekstrim dan Abrasi'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Gelombang Ekstrim dan Abrasi'])
                                }
                            },
                            {
                                name: 'Kebakaran Hutan dan Lahan',
                                alertLevel: {
                                    color: row['Kebakaran Hutan dan Lahan'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Kebakaran Hutan dan Lahan'])
                                }
                            },
                            {
                                name: 'Letusan Gunung Berapi',
                                alertLevel: {
                                    color: row['Letusan Gunung Berapi'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Letusan Gunung Berapi'])
                                }
                            },
                            {
                                name: 'Tanah Longsor',
                                alertLevel: {
                                    color: row['Tanah Longsor'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Tanah Longsor'])
                                }
                            },
                            {
                                name: 'Multi Bahaya',
                                alertLevel: {
                                    color: row['Multi Bahaya'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Multi Bahaya'])
                                }
                            },
                            {
                                name: 'Terorisme',
                                alertLevel: {
                                    color: row['Terorisme'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Terorisme'])
                                }
                            },
                            {
                                name: 'Likuefaksi',
                                alertLevel: {
                                    color: row['Likuefaksi'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Likuefaksi'])
                                }
                            },
                            {
                                name: 'Terorisme',
                                alertLevel: {
                                    color: row['Terorisme'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Terorisme'])
                                }
                            },
                            {
                                name: 'Konflik',
                                alertLevel: {
                                    color: row['Konflik'].toLowerCase(),
                                    meaning: alertLevelMeaning(row['Konflik'])
                                }
                            }
                        ],
                        churchImage: checkImage(row['name']) 
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(row['Longitude']), parseFloat(row['Latitude'])
                        ]
                    },
                });
    
                church.save(function(err, church) {
                    // if (err) console.log(err);
                    // console.log(church.properties.name + " successfully stored on database!");
                });
                
                // console.log("IMAGE URL: \n\t", checkImage(row['name']));
                // // console.log(row);
                // // console.log(church);
                // // console.log();
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`)
        );
    }

    lihatURL();
});

// ===== ===== Detail Church Jogja (tambahan 2 field baru) ===== =====
// db.once('open', function() {
//     let schema = new mongoose.Schema(
//         {
//             type: String,
//             properties: {
//                 name: String,
//                 address: String,
//                 province: String,
//                 congregation: String,
//                 risks: {
//                     risk_1: String,
//                     risk_2: String,
//                     risk_3: String
//                 },
//                 preparedness: String,
//                 emergencyResPlan: String,
//                 warningSystem: String,
//                 permanentBuilding: String,
//                 nonPermanentBuilding: String,
//                 doorWindow: String,
//                 buildingCode: String,
//                 constructionDoc: String,
//                 earthquakeResistant: String,
//                 buildingEarthquakeImpact: String,
//                 facilityEarthquakeImpact: String,
//                 faciltyEndanger: String,
//                 evacuationPath: String,
//                 evacuationPathVulnerable: String,
//                 evacuationOfficer: String,
//                 emergencyCommission: String,
//                 competent: String,
//                 evacuationSimulation: String,
//                 preparednessTools: String,
//                 facingDisasterProg: String,
//                 handlingSkill: String,
//                 dataRoutine: String,
//                 disasterResponseSOP: String,
//                 specialBudget: String,
//                 raiseFunds: String,
//                 emergencyResponse: String,
//                 interactionGuide: String,
//                 provideTraining: String,
//                 economicDev: String,
//                 churchEducation: String,
//                 riskReduction: String,
//                 disasterOccurs: String,
//                 trainingNeeds: String,
//                 increaseCapacity: String,
//                 evacuationGuidePerson: String,
//                 lastUpdate: String,
//                 disasterContactPerson: String,
//                 disasterRisks: [],
//                 churchImage: String
//             },
//             geometry: {
//                 type: String,
//                 coordinates: []
//             }
//         },
//         {
//             typeKey: "$type"
//         }
//     );

//     const images = db.collection("images" + ".files");
//     let cursor = images.find({});
//     let listImageOnDatabaseURL = [];
//     let lihatURL = async () => {
//         await cursor.forEach((doc) => {
//             listImageOnDatabaseURL.push(process.env.PTB_BASE_URL + "/api/files/" + doc.filename);
//         });
//         // console.log(listImageOnDatabaseURL);

//         function checkImage(namaGereja) {
//             let result;
//             for (let idx = 0; idx < listImageOnDatabaseURL.length; idx++) {
//                 const imageURL = listImageOnDatabaseURL[idx];
//                 if(imageURL.includes(namaGereja)) {
//                     result = imageURL;
//                     break;
//                 } else {
//                     result = process.env.PTB_DEFAULT_CHURCH_IMAGE_URL;
//                 }
//             }
//             return result;
//         }
//         // // console.log("IMAGE URL: \n\t", checkImage("Kibaid Jemaat Palu"));
//         // // console.log("IMAGE URL: \n\t", checkImage("GBI Woodward Palu"));

//         fs.createReadStream(
//             path.resolve(__dirname, 'app', 'assets', 'DetailGereja-Jogja.csv'))
//             // path.resolve(__dirname, 'app', 'assets', 'MappingTingkatKewaspadaanCopy.csv')) // test insert 5 data
//             .pipe(csv.parse({ headers: true }))
//             .on('error', error => console.error(error))
//             .on('data', function(row) {
//                 let Church = mongoose.model("church", schema, "churches");
                
//                 let church = new Church({
//                     type: 'Feature',
//                     properties: {
//                         name: row['name'],
//                         address: row['address'],
//                         province: row['province'],
//                         congregation: row['congregation'],
//                         risks: {
//                             risk_1: row['risk_1'],
//                             risk_2: row['risk_2'],
//                             risk_3: row['risk_3']
//                         },
//                         preparedness: row['preparedness'],
//                         emergencyResPlan: row['emergencyResPlan'],
//                         warningSystem: row['warningSystem'],
//                         permanentBuilding: row['permanentBuilding'],
//                         nonPermanentBuilding: row['nonPermanentBuilding'],
//                         doorWindow: row['doorWindow'],
//                         buildingCode: row['buildingCode'],
//                         constructionDoc: row['constructionDoc'],
//                         earthquakeResistant: row['earthquakeResistant'],
//                         buildingEarthquakeImpact: row['buildingEarthquakeImpact'],
//                         facilityEarthquakeImpact: row['facilityEarthquakeImpact'],
//                         faciltyEndanger: row['faciltyEndanger'],
//                         evacuationPath: row['evacuationPath'],
//                         evacuationPathVulnerable: row['evacuationPathVulnerable'],
//                         evacuationOfficer: row['evacuationOfficer'],
//                         emergencyCommission: row['emergencyCommission'],
//                         competent: row['competent'],
//                         evacuationSimulation: row['evacuationSimulation'],
//                         preparednessTools: row['preparednessTools'],
//                         facingDisasterProg: row['facingDisasterProg'],
//                         handlingSkill: row['handlingSkill'],
//                         dataRoutine: row['dataRoutine'],
//                         disasterResponseSOP: row['disasterResponseSOP'],
//                         specialBudget: row['specialBudget'],
//                         raiseFunds: row['raiseFunds'],
//                         emergencyResponse: row['emergencyResponse'],
//                         interactionGuide: row['interactionGuide'],
//                         provideTraining: row['provideTraining'],
//                         economicDev: row['economicDev'],
//                         churchEducation: row['churchEducation'],
//                         riskReduction: row['riskReduction'],
//                         disasterOccurs: row['disasterOccurs'],
//                         trainingNeeds: row['trainingNeeds'],
//                         increaseCapacity: row['increaseCapacity'],
//                         evacuationGuidePerson: row['evacuationGuidePerson'],
//                         lastUpdate: row['lastUpdate'],
//                         disasterContactPerson: row['disasterContactPerson'],
//                         disasterRisks: [
//                             {
//                                 name: 'Gempa',
//                                 alertLevel: {
//                                     color: row['Gempa'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Gempa'])
//                                 }
//                             },
//                             {
//                                 name: 'Banjir',
//                                 alertLevel: {
//                                     color: row['Banjir'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Banjir'])
//                                 }
//                             },
//                             {
//                                 name: 'Kekeringan',
//                                 alertLevel: {
//                                     color: row['Kekeringan'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Kekeringan'])
//                                 }
//                             },
//                             {
//                                 name: 'Tsunami',
//                                 alertLevel: {
//                                     color: row['Tsunami'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Tsunami'])
//                                 }
//                             },
//                             {
//                                 name: 'Cuaca Ekstrim',
//                                 alertLevel: {
//                                     color: row['Cuaca Ekstrim'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Cuaca Ekstrim'])
//                                 }
//                             },
//                             {
//                                 name: 'Gelombang Ekstrim dan Abrasi',
//                                 alertLevel: {
//                                     color: row['Gelombang Ekstrim dan Abrasi'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Gelombang Ekstrim dan Abrasi'])
//                                 }
//                             },
//                             {
//                                 name: 'Kebakaran Hutan dan Lahan',
//                                 alertLevel: {
//                                     color: row['Kebakaran Hutan dan Lahan'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Kebakaran Hutan dan Lahan'])
//                                 }
//                             },
//                             {
//                                 name: 'Letusan Gunung Berapi',
//                                 alertLevel: {
//                                     color: row['Letusan Gunung Berapi'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Letusan Gunung Berapi'])
//                                 }
//                             },
//                             {
//                                 name: 'Tanah Longsor',
//                                 alertLevel: {
//                                     color: row['Tanah Longsor'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Tanah Longsor'])
//                                 }
//                             },
//                             {
//                                 name: 'Multi Bahaya',
//                                 alertLevel: {
//                                     color: row['Multi Bahaya'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Multi Bahaya'])
//                                 }
//                             },
//                             {
//                                 name: 'Terorisme',
//                                 alertLevel: {
//                                     color: row['Terorisme'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Terorisme'])
//                                 }
//                             },
//                             {
//                                 name: 'Likuefaksi',
//                                 alertLevel: {
//                                     color: row['Likuefaksi'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Likuefaksi'])
//                                 }
//                             },
//                             {
//                                 name: 'Terorisme',
//                                 alertLevel: {
//                                     color: row['Terorisme'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Terorisme'])
//                                 }
//                             },
//                             {
//                                 name: 'Konflik',
//                                 alertLevel: {
//                                     color: row['Konflik'].toLowerCase(),
//                                     meaning: alertLevelMeaning(row['Konflik'])
//                                 }
//                             }
//                         ],
//                         churchImage: checkImage(row['name']) 
//                     },
//                     geometry: {
//                         type: "Point",
//                         coordinates: [
//                             parseFloat(row['Longitude']), parseFloat(row['Latitude'])
//                         ]
//                     },
//                 });
    
//                 church.save(function(err, church) {
//                     if (err) // console.log(err);
//                     // console.log(church.properties.name + " successfully stored on database!");
//                 });
                
//                 // console.log("IMAGE URL: \n\t", checkImage(row['name']));
//                 // // console.log(row);
//                 // // console.log(church);
//                 // // console.log();
//             })
//             .on('end', rowCount => // console.log(`Parsed ${rowCount} rows`)
//         );
//     }

//     lihatURL();
// });





/*controller.js*/
    // var condition = title ? 
    // {
    //     title: {
    //         // Mongodb regullar expression for pattern mathcing strings [https://docs.mongodb.com/manual/reference/operator/query/regex/]
    //         $regex: new RegExp(title), 
    //         $options: "i" } // Case insensitivity to match upper and lower cases
    // } : {};

    /*
    db.churches.find(
            {
                "_id" : ObjectId("4ecc05e55dd98a436ddcc47c")
            },
            {
                "properties.name": 1,
                "properties.address": 1,
                "properties.disasterRisks": 1,
                "geometry.type": 1,
                "geometry.coordinates": 1
            }
        )

    db.churches.find(
            {
                "properties.name": 1,
                "properties.address": 1,
                "properties.disasterRisks": 1,
                "geometry.type": 1,
                "geometry.coordinates": 1
            }
        )
    */