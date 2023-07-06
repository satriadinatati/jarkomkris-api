module.exports = (mongoose) => {
  let schema = mongoose.Schema(
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

  const Church = mongoose.model("church", schema, "churches");
  return Church;
};