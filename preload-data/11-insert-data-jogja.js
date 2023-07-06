require("dotenv").config();
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

let alertLevelMeaning = (kategoriBencana) => {
    return (kategoriBencana === '#CF3333') ? "risiko sangat tinggi":
        (kategoriBencana === '#FF8E00') ? "risiko tinggi": 
        (kategoriBencana === '#F7EA00') ? "risiko sedang":
        (kategoriBencana === '#31AA75') ? "risiko rendah": false
}

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
                awareness: {
                    label: String,
                    preparedness: String,
                    emergencyResPlan: String,
                    evacuationOfficer: String,
                    emergencyCommission: String,
                    evacuationSimulation: String,
                    facingDisasterProg: String,
                    handlingSkill: String,
                    dataRoutine: String,
                    disasterResponseSOP: String
                },
                buildingPreparedness: {
                    label: String,
                    warningSystem: String,
                    permanentBuilding: String,
                    doorWindow: String,
                    buildingCode: String,
                    constructionDoc: String,
                    earthquakeResistant: String,
                    buildingEarthquakeImpact: String,
                    facilityEarthquakeImpact: String,
                    faciltyEndanger: String,
                    evacuationPath: String,
                    evacuationPathVulnerable: String
                },
                teamPreparedness: {
                    label: String,
                    specialBudget: String,
                    raiseFunds: String,
                    emergencyResponse: String,
                    interactionGuide: String,
                    provideTraining: String,
                    economicDev: String,
                    churchEducation: String,
                    riskReduction: String
                },        
                competent: String,                
                preparednessTools: String,                                                                                                                                                                                             
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
    let defaultChurchImageURL = process.env.PTB_DEFAULT_CHURCH_IMAGE_URL;

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
                    result = defaultChurchImageURL;
                }
            }
            return result;
        }

        fs.createReadStream(
            path.resolve(__dirname, '../app', 'assets', 'Data_Jogja.csv'))
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
                        awareness: {
                            label: "Kesadaran Gereja Terhadap Bencana",
                            preparedness: row['preparedness'],
                            emergencyResPlan: row['emergencyResPlan'],
                            evacuationOfficer: row['evacuationOfficer'],
                            emergencyCommission: row['emergencyCommission'],
                            evacuationSimulation: row['evacuationSimulation'],
                            facingDisasterProg: row['facingDisasterProg'],
                            handlingSkill: row['handlingSkill'],
                            dataRoutine: row['dataRoutine'],
                            disasterResponseSOP: row['disasterResponseSOP']
                        },
                        buildingPreparedness: {
                            label: "Kesiapan Bangunan Gereja dalam Menghadapi Bencana",
                            warningSystem: row['warningSystem'],
                            permanentBuilding: row['permanentBuilding'],                        
                            doorWindow: row['doorWindow'],
                            buildingCode: row['buildingCode'],
                            constructionDoc: row['constructionDoc'],
                            earthquakeResistant: row['earthquakeResistant'],
                            buildingEarthquakeImpact: row['buildingEarthquakeImpact'],
                            facilityEarthquakeImpact: row['facilityEarthquakeImpact'],
                            faciltyEndanger: row['faciltyEndanger'],
                            evacuationPath: row['evacuationPath'],
                            evacuationPathVulnerable: row['evacuationPathVulnerable']                         
                        },
                        teamPreparedness: {
                            label: "Kesiapan Team dalam Menghadapi Bencana",
                            specialBudget: row['specialBudget'],
                            raiseFunds: row['raiseFunds'],
                            emergencyResponse: row['emergencyResponse'],
                            interactionGuide: row['interactionGuide'],
                            provideTraining: row['provideTraining'],
                            economicDev: row['economicDev'],
                            churchEducation: row['churchEducation'],
                            riskReduction: row['riskReduction']
                        },                                                                        
                        competent: row['competent'],                        
                        preparednessTools: row['preparednessTools'],                                                
                        disasterOccurs: row['disasterOccurs'],
                        trainingNeeds: row['trainingNeeds'],
                        increaseCapacity: row['increaseCapacity'],                        
                        lastUpdate: row['lastUpdate'],                        
                        disasterRisks: [
                            {
                                name: 'Gempa',
                                alertLevel: {
                                    color: row['Gempa'],
                                    meaning: alertLevelMeaning(row['Gempa'])
                                }
                            },
                            {
                                name: 'Banjir',
                                alertLevel: {
                                    color: row['Banjir'],
                                    meaning: alertLevelMeaning(row['Banjir'])
                                }
                            },
                            {
                                name: 'Kekeringan',
                                alertLevel: {
                                    color: row['KekeRingan'],
                                    meaning: alertLevelMeaning(row['KekeRingan'])
                                }
                            },
                            {
                                name: 'Tsunami',
                                alertLevel: {
                                    color: row['Tsunami'],
                                    meaning: alertLevelMeaning(row['Tsunami'])
                                }
                            },
                            {
                                name: 'Cuaca Ekstrim',
                                alertLevel: {
                                    color: row['Cuaca Ekstrim'],
                                    meaning: alertLevelMeaning(row['Cuaca Ekstrim'])
                                }
                            },
                            {
                                name: 'Gelombang Ekstrim dan Abrasi',
                                alertLevel: {
                                    color: row['Gelombang Ekstrim dan Abrasi'],
                                    meaning: alertLevelMeaning(row['Gelombang Ekstrim dan Abrasi'])
                                }
                            },
                            {
                                name: 'Kebakaran Hutan dan Lahan',
                                alertLevel: {
                                    color: row['Kebakaran Hutan dan Lahan'],
                                    meaning: alertLevelMeaning(row['Kebakaran Hutan dan Lahan'])
                                }
                            },
                            {
                                name: 'Letusan Gunung Berapi',
                                alertLevel: {
                                    color: row['Letusan Gunung Berapi'],
                                    meaning: alertLevelMeaning(row['Letusan Gunung Berapi'])
                                }
                            },
                            {
                                name: 'Tanah Longsor',
                                alertLevel: {
                                    color: row['Tanah Longsor'],
                                    meaning: alertLevelMeaning(row['Tanah Longsor'])
                                }
                            },
                            {
                                name: 'Multi Bahaya',
                                alertLevel: {
                                    color: row['Multi Bahaya'],
                                    meaning: alertLevelMeaning(row['Multi Bahaya'])
                                }
                            },
                            {
                                name: 'Terorisme',
                                alertLevel: {
                                    color: row['Terorisme'],
                                    meaning: alertLevelMeaning(row['Terorisme'])
                                }
                            },
                            {
                                name: 'Likuefaksi',
                                alertLevel: {
                                    color: row['Likuefaksi'],
                                    meaning: alertLevelMeaning(row['Likuefaksi'])
                                }
                            },
                            {
                                name: 'Terorisme',
                                alertLevel: {
                                    color: row['Terorisme'],
                                    meaning: alertLevelMeaning(row['Terorisme'])
                                }
                            },
                            {
                                name: 'Konflik',
                                alertLevel: {
                                    color: row['Konflik'],
                                    meaning: alertLevelMeaning(row['Konflik'])
                                }
                            }
                        ],
                        churchImage: (listImageOnDatabaseURL.length == 0)? defaultChurchImageURL: checkImage(row['name']) 
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(row['Longitude']), parseFloat(row['Latitude'])
                        ]
                    },
                });
    
                church.save(function(err, church) {
                    if (err) console.log(err);
                    // console.log(church.properties.name + " successfully stored on database!");
                });
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`)
        );
    }

    lihatURL();
});