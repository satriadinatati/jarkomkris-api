module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      totalCongregation: Number,
      buildingPreparedness: Number,
      teamPreparedness: Number,
      awareness: Number,
      risk_1: {
          gempa: Number,
          covid19: Number,
          banjir: Number,
          kebakaran: Number,
          terorisme: Number,
          konflikSosial: Number,
          alam: Number
      },
      risk_2: {
          gempa: Number,
          konflikSosial: Number,
          terorisme: Number,
          covid19: Number,
          angin: Number,
          kebakaran: Number,
          konflikKelompok: Number,
          likuefaksi: Number,
          tsunami: Number,
          banjir: Number,
          nonAlam: Number
      },
      risk_3: {
          gempa: Number,
          konflikSosial: Number,
          terorisme: Number,
          covid19: Number,
          angin: Number,
          kebakaran: Number,
          konflikKelompok: Number,
          tidakAda: Number,
          kebebasanIbadah: Number,
          likuefaksi: Number,
          tsunami: Number,
          tanahLongsor: Number,
          sosial: Number,
          kekeringan: Number,
      },
      preparednessPlanning: Number,
      emergencyResPlan: Number,
      warningSystem: Number,	
      permanentChurchBuilding: Number,
      doorWindowOut: Number,
      accordanceBuildingCode: Number,
      constructionDoc: Number,	
      earthquakeResistant: Number,
      buildingEarthquakeImpact: Number,
      facilityEarthquakeImpact: Number,	
      faciltyEndanger: Number,
      evacuationPath: Number,
      evacuationPathVulnerable: Number,
      evacuationOfficer: Number,	
      emergencyCommission: Number,
      evacuationSimulation: Number,
      disasterPreparednessPlan: Number,
      handlingAbility: Number,
      routineDataCollectionAgenda: Number,
      disasterResponseRegulations: Number,
      disasterBudgetAllocation: Number,
      churchRaisesFunds: Number,
      socializationOfDisasterEmergencyManagement: Number,
      disasterCommitteeInteractionGuide: Number,
      disasterTrainingSpeaker: Number
    },
    {
      typeKey: "$type"
    }
  );

  const Dashboard = mongoose.model("dashboard", schema, "dashboard");
  return Dashboard;
};