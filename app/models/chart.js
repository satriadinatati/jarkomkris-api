module.exports = (mongoose) => {
    let schema = mongoose.Schema(
        {
        province: String,
        notReady: Number,
        readyEnough: Number,
        ready: Number,
        veryReady: Number
        },
        {
        typeKey: "$type"
        }
    );
  
    const Chart = mongoose.model("chart", schema, "chart");
    return Chart;
};