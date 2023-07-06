module.exports = (mongoose) => {
    let schema = mongoose.Schema(
        {
            totalHurricane: Number,
            totalWildfire: Number,
            totalDryness: Number,
            totalFlood: Number
        },      
        {
            typeKey: "$type"
        }
    );
  
    const Total = mongoose.model("total", schema, "total");
    return Total;
};