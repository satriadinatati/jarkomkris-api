module.exports = (mongoose) => {
    let schema = mongoose.Schema(      
        {            
            totalCongregation: Number,
            totalCovid: Number,
            totalEarthquake: Number,
            churchPreparedness: Number,
            numberIndicators: Number,
            churchBuilding: Number,
            churchAwareness: Number,
            churchTeam: Number
        },
        {
            typeKey: "$type"
        }    
    );
  
    const Overview = mongoose.model("overview", schema, "overview");
    return Overview;
};