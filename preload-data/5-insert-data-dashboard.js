dashboardData = [
    {
        "location": {
            "provinsi": "Sulawesi Tengah",
            "kota": "Palu"
        },
        "dashboardData": {
            "totalCongregation": 32248,
            "buildingPreparedness": 63.21,
            "teamPreparedness": 53.13,
            "awareness": 44.10,
            "risk_1": {
                "gempa": 53,
                "covid19": 4,
                "banjir": 2,
                "kebakaran": 1,
                "terorisme": 2,
                "konflikSosial": 2,
                "alam": 1
            },
            "risk_2": {
                "gempa": 8,
                "konflikSosial": 1,
                "terorisme": 10,
                "covid19": 28,
                "angin":8,
                "kebakaran": 2,
                "konflikKelompok": 1,
                "likuefaksi": 1,
                "tsunami": 2,
                "banjir": 2,
                "nonAlam": 1
            },
            "risk_3": {
                "gempa": 1,
                "konflikSosial": 12,
                "terorisme": 23,
                "covid19": 9,
                "angin": 2,
                "kebakaran": 1,
                "konflikKelompok": 1,
                "tidakAda": 6,
                "kebebasanIbadah": 2,
                "likuefaksi": 3,
                "tsunami": 1,
                "tanahLongsor": 1,
                "sosial": 1,
                "kekeringan": 1,
            },
            "preparednessPlanning": 36,
            "emergencyResPlan": 27,
            "warningSystem": 4,	
            "permanentChurchBuilding": 61,
            "doorWindowOut": 56,
            "accordanceBuildingCode": 57,
            "constructionDoc": 50,	
            "earthquakeResistant": 53,
            "buildingEarthquakeImpact": 45,
            "facilityEarthquakeImpact": 50,	
            "faciltyEndanger": 14,
            "evacuationPath": 39,
            "evacuationPathVulnerable": 16,
            "evacuationOfficer": 23,	
            "emergencyCommission": 19,
            "evacuationSimulation": 25,
            "disasterPreparednessPlan": 14,
            "handlingAbility": 55,
            "routineDataCollectionAgenda": 48,
            "disasterResponseRegulations": 7,
            "disasterBudgetAllocation": 23,
            "churchRaisesFunds": 64,
            "socializationOfDisasterEmergencyManagement": 25,
            "disasterCommitteeInteractionGuide": 22,
            "disasterTrainingSpeaker": 36
        }
    },
    {
        "location": {
            "provinsi": "Daerah Istimewa Yogyakarta"
        },
        "dashboardData": {
            "totalCongregation": 48086,
            "buildingPreparedness": 59.42,
            "teamPreparedness": 65.36,
            "awareness": 59.19,
            "risk_1": {
                "gempa": 2,
                "banjir": 4,
                "covid19": 3,
                "anginKencang": 2,
                "putingBeliung": 2,
                "gunungMeletus": 4,
                "bencanaSosial": 1,
                "tanahLongsor": 6,
                "nonAlam": 2,
                "kekeringan": 7,
                "konflikSosial": 2
            },
            "risk_2": {
                "gempa": 1,
                "banjir": 4,
                "covid19": 3,
                "anginKencang": 3,
                "putingBeliung": 1,
                "gunungMeletus": 6,
                "bencanaSosial": 2,    
                "nonAlam": 4,
                "kekeringan": 5,
                "konflikSosial": 1
            },
            "risk_3": {
                "gempa": 2,
                "banjir": 2,
                "covid19": 1,
                "anginKencang": 2,
                "putingBeliung": 1,
                "terorisme": 2,
                "pomBensinMeledak": 1,            
                "bencanaSosial": 1,
                "tanahLongsor": 1,
                "nonAlam": 1,            
                "konflikSosial": 5
            },
            "preparednessPlanning": 53,
            "emergencyResPlan": 54,
            "warningSystem": 22,	
            "permanentChurchBuilding": 66,
            "doorWindowOut": 67,
            "accordanceBuildingCode": 66,
            "constructionDoc": 33,	
            "earthquakeResistant": 61,
            "buildingEarthquakeImpact": 30,
            "facilityEarthquakeImpact": 34,	
            "faciltyEndanger": 6,
            "evacuationPath": 35,
            "evacuationPathVulnerable": 31,
            "evacuationOfficer": 27,	
            "emergencyCommission": 52,
            "evacuationSimulation": 40,
            "disasterPreparednessPlan": 36,
            "handlingAbility": 49,
            "disasterResponseRegulations": 18,
            "disasterBudgetAllocation": 46,
            "churchRaisesFunds": 69,
            "socializationOfDisasterEmergencyManagement": 34,
            "disasterCommitteeInteractionGuide": 24,
            "disasterTrainingSpeaker": 59,
            "economicDev": 44,
            "churchEducation": 42,
            "riskReduction": 56,
            "evacuationGuidePerson": 27,
            "disasterContactPerson": 50
        }
    }
]

require("dotenv").config();
let mongoose = require('mongoose');
mongoose.connect(process.env.PTB_DATABASE_URL + process.env.PTB_DATABASE);
let db = mongoose.connection;

db.once('open', function() {
    let schema = new mongoose.Schema(
        {
            location: {},
            dashboardData: {}
        },
        {
            typeKey: "$type"
        }
    );
    
    dashboardData.forEach(dashboardDataPerRegion => {
        let Dashboard = mongoose.model("dashboard", schema, "dashboard");
        
        let dashboard = new Dashboard(dashboardDataPerRegion);
    
        dashboard.save(function(err, dashboard) {
            if (err) console.log(err);
            console.log("Dashboard data successfully stored on database!");
        });
    });
});