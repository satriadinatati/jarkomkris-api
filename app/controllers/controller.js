const db = require("../models");
const Church = db.church;
const Faq = db.faq;
const Article = db.article;
const Weather = db.weather;
const Dashboard = db.dashboard;
const Overview = db.overview;
const Gempa = db.gempa;
const Chart = db.chart;
const Total = db.total;
const Vaccine = db.vaccine;
const Covid = db.covid;

exports.getRoutes = async (req, res) => {
    // const id = req.params.id;
    
    // var route, routes = [];

    // app._router.stack.forEach(function(middleware){
    //     if(middleware.route){ // routes registered directly on the app
    //         routes.push(middleware.route);
    //     } else if(middleware.name === 'router'){ // router middleware 
    //         middleware.handle.stack.forEach(function(handler){
    //             route = handler.route;
    //             route && routes.push(route);
    //         });
    //     }
    // });
    
    res.send(routes);
};

exports.churchFindAll = async (req, res) => {
    const title = req.query.title;
    var condition = [
            {}, 
            {
                "properties.name": 1, 
                "properties.address": 1,
                "properties.province": 1,
                "properties.disasterOccurs": 1,
                "properties.disasterRisks": 1,
                "geometry.type": 1,
                "geometry.coordinates": 1
            }
        ];
  
    Church.find(...condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving churchess. "});
        });
};

exports.churchFindOne = async (req, res) => {
    const id = req.params.id;
    
    Church.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Not found Church with id " + id });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error retrieving Church with id = " + id });
        });
};

exports.faqFindAll = async (req, res) => {
    Faq.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving faqs." });
        });
};

exports.faqFindOne = async (req, res) => {
    const id = req.params.id;

    Faq.findById(id)
    .then((data) => {
        if(!data) {
            res.status(404).send({ message: "Not found FAQ with id " + id });
        } else {
            res.send(data);
        }        
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Error retrieving FAQ with id = " + id });
    })
}

exports.articleFindAll = async (req, res) => {
    Article.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving articles."  });
        });
};

exports.articleFindOne = async (req, res) => {
    const id = req.params.id;

    Article.findById(id)
    .then((data) => {
        if(!data) {
            res.status(404).send({ message: "Not found Article with id " + id });
        } else {
            res.send(data);
        }        
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Error retrieving Artcile with id = " + id });
    })
}

exports.weatherFindAll = async (req, res) => {
    Weather.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving weather." });
        });
};

exports.dashboardFindAll = async (req, res) => {
    Dashboard.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving dashboard." });
        });
};

exports.overviewFindAll = async (req, res) => {
    Overview.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving overview." });
        });
};

exports.gempaFindAll = async (req, res) => {
    Gempa.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving data gempa." });
        });
};

exports.chartFindAll = async (req, res) => {
    Chart.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving data chart." });
        });
};

exports.totalFindAll = async (req, res) => {
    Total.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving data total prakiraan cuaca." });
        });
};

exports.vaccineFindAll = async (req, res) => {
    Vaccine.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving data vaccine." });
        });
};

exports.covidFindAll = async (req, res) => {
    Covid.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving covid-19 data." });
        });
};

exports.createChurch = (req, res) => {
    if(!req.query.name){
        return res.status(400).send( {message: "Name can't be empty!" });
    }

    const church = new Church({
        properties:{
            name: req.query.name,
            address: req.query.address,
            province: req.query.province,
            congregation: req.query.congregation,
            risks:{
                risk_1: req.query.risk_1,
                risk_2: req.query.risk_2,
                risk_3: req.query.risk_3,
            },
            awareness: {         
                label: "Kesadaran Gereja Terhadap Bencana",       
                preparedness: req.query.preparedness,
                emergencyResPlan: req.query.emergencyResPlan,
                evacuationOfficer: req.query.evacuationOfficer,
                emergencyCommission: req.query.emergencyCommission,
                evacuationSimulation: req.query.evacuationSimulation,
                facingDisasterProg: req.query.facingDisasterProg,
                handlingSkill: req.query.handlingSkill,
                dataRoutine: req.query.dataRoutine,
                disasterResponseSOP: req.query.disasterResponseSOP
            },
            buildingPreparedness: {    
                label: "Kesiapan Bangunan Gereja dalam Menghadapi Bencana",   
                warningSystem: req.query.warningSystem,
                permanentBuilding: req.query.permanentBuilding,        
                doorWindow: req.query.doorWindow,
                buildingCode: req.query.buildingCode,
                constructionDoc: req.query.constructionDoc,
                earthquakeResistant: req.query.earthquakeResistant,
                buildingEarthquakeImpact: req.query.buildingEarthquakeImpact,
                facilityEarthquakeImpact: req.query.facilityEarthquakeImpact,
                faciltyEndanger: req.query.faciltyEndanger,
                evacuationPath: req.query.evacuationPath,
                evacuationPathVulnerable: req.query.evacuationPathVulnerable
            },
            teamPreparedness: {       
                label: "Kesiapan Team dalam Menghadapi Bencana",          
                specialBudget: req.query.specialBudget,
                raiseFunds: req.query.raiseFunds,
                emergencyResponse: req.query.emergencyResponse,
                interactionGuide: req.query.interactionGuide,
                provideTraining: req.query.provideTraining,
                economicDev: req.query.economicDev,
                churchEducation: req.query.churchEducation,
                riskReduction: req.query.riskReduction
            },
            competent: req.query.competent,        
            preparednessTools: req.query.preparednessTools,        
            disasterOccurs: req.query.disasterOccurs,
            trainingNeeds: req.query.trainingNeeds,
            increaseCapacity: req.query.increaseCapacity,
            lastUpdate: req.query.lastUpdate,        
            disasterRisks: req.query.disasterRisks,
            churcImage: req.query.churcImage,
        },        
        geometry: {
            coordinates: req.query.coordinates
        }
    });

    church
        .save(church)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured." });
        });
};

exports.createArticle = (req, res) => {
    if(!req.query.title){
        return res.status(400).send({ message: "Title can't be empty!" });
    }

    const article = new Article({
        date: req.query.date,
        title: req.query.title,
        content: req.query.content,
        image: req.query.image
    });

    article
        .save(article)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured." });
        });
};

exports.createFaq = (req, res) => {
    if(!req.query.question){
        return res.status(400).send({ message: "Question can't be empty!" });
    }

    const faq = new Faq({
        number: req.query.number,
        question: req.query.question,
        answer: req.query.answer
    });

    faq
        .save(faq)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured." });
        });
};

exports.updateChurch = (req, res) => {
    if(!req.query.name) {
        return res.status(400).send({ message: "Name can't be empty" });
    }

    Church.findByIdAndUpdate(req.params.id, {
        properties: {
            name: req.query.name,
            address: req.query.address,
            province: req.query.province,
            congregation: req.query.congregation,
            risks:{
                risk_1: req.query.risk_1,
                risk_2: req.query.risk_2,
                risk_3: req.query.risk_3,
            },
            awareness: {    
                label: "Kesadaran Gereja Terhadap Bencana",            
                preparedness: req.query.preparedness,
                emergencyResPlan: req.query.emergencyResPlan,
                evacuationOfficer: req.query.evacuationOfficer,
                emergencyCommission: req.query.emergencyCommission,
                evacuationSimulation: req.query.evacuationSimulation,
                facingDisasterProg: req.query.facingDisasterProg,
                handlingSkill: req.query.handlingSkill,
                dataRoutine: req.query.dataRoutine,
                disasterResponseSOP: req.query.disasterResponseSOP
            },
            buildingPreparedness: {       
                label: "Kesiapan Bangunan Gereja dalam Menghadapi Bencana",
                warningSystem: req.query.warningSystem,
                permanentBuilding: req.query.permanentBuilding,        
                doorWindow: req.query.doorWindow,
                buildingCode: req.query.buildingCode,
                constructionDoc: req.query.constructionDoc,
                earthquakeResistant: req.query.earthquakeResistant,
                buildingEarthquakeImpact: req.query.buildingEarthquakeImpact,
                facilityEarthquakeImpact: req.query.facilityEarthquakeImpact,
                faciltyEndanger: req.query.faciltyEndanger,
                evacuationPath: req.query.evacuationPath,
                evacuationPathVulnerable: req.query.evacuationPathVulnerable
            },
            teamPreparedness: { 
                label: "Kesiapan Team dalam Menghadapi Bencana",               
                specialBudget: req.query.specialBudget,
                raiseFunds: req.query.raiseFunds,
                emergencyResponse: req.query.emergencyResponse,
                interactionGuide: req.query.interactionGuide,
                provideTraining: req.query.provideTraining,
                economicDev: req.query.economicDev,
                churchEducation: req.query.churchEducation,
                riskReduction: req.query.riskReduction
            },
            competent: req.query.competent,        
            preparednessTools: req.query.preparednessTools,        
            disasterOccurs: req.query.disasterOccurs,
            trainingNeeds: req.query.trainingNeeds,
            increaseCapacity: req.query.increaseCapacity,
            lastUpdate: req.query.lastUpdate,        
            disasterRisks: req.query.disasterRisks,
            churchImage: req.query.churchImage,
        },        
        geometry: {
            coordinates: req.query.coordinates
        } 
    }, {new: true})
    .then(church => {
        if(!church) {
            return res.status(404).send({message: "Church not found with id " + req.params.id});
        }
        res.send(church);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({message: "Church not found with id " + req.params.id});
        }
        return res.status(500).send({message: "Error updating church with id " + req.params.id});
    });
};

exports.updateArticle = (req, res) => {
    if(!req.query.title) {
        return res.status(400).send({message: "Title can't be empty"});
    }

    Article.findByIdAndUpdate(req.params.id, {
        date: req.query.date,
        title: req.query.title,
        content: req.query.content,
        image: req.query.image 
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({message: "Article not found with id " + req.params.id + " and title of " + req.params.title});
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({message: "Article not found with id " + req.params.id + " and title of " + req.params.title});
        }
        return res.status(500).send({message: "Error updating article with id " + req.params.id + " and title of " + req.params.title});
    });
};

exports.updateFaq = (req, res) => {
    if(!req.query.question) {
        return res.status(400).send({message: "Question can't be empty"});
    }

    Faq.findByIdAndUpdate(req.params.id, {
        number: req.query.number,
        question: req.query.question,
        answer: req.query.answer
    }, {new: true})
    .then(faq => {
        if(!faq) {
            return res.status(404).send({message: "FAQ not found with id " + req.params.id});
        }
        res.send(faq);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({message: "FAQ not found with id " + req.params.id});
        }
        return res.status(500).send({message: "Error updating FAQ with id " + req.params.id});
    });
}

exports.deleteChurch = (req, res) => {
    Church.findByIdAndRemove(req.params.id)
    .then(church => {
        if(!church) {
            return res.status(404).send({message: "Church not found with id " + req.params.id});
        }
        return res.send({message: "Church deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({message: "Church not found with id " + req.params.id});
        }
        return res.status(500).send({message: "Couldn't delete church with id " + req.params.id});
    })
};

exports.deleteArticle = (req, res) => {
    Article.findByIdAndRemove(req.params.id)
    .then(article => {
        if(!article){
            return res.status(404).send({message: "Article not found with id " + req.params.id + " and title of " + req.params.title})
        }
        return res.send({message: "Article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({message: "Article not found with id " + req.params.id + " and title of " + req.params.title});
        }
        return res.status(500).send({message: "Couldn't delete article with id " + req.params.id + " and title of " + req.params.title});
    })
}

exports.deleteFaq = (req, res) => {
    Faq.findByIdAndRemove(req.params.id)
    .then(faq => {
        if(!faq){
            return res.status(404).send({message: "FAQ not found with id " + req.params.id})
        }
        return res.send({message: "FAQ deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({message: "FAQ not found with id " + req.params.id});
        }
        return res.status(500).send({message: "Couldn't delete FAQ with id " + req.params.id});
    })
}