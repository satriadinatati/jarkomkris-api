module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {        
        name: String,
        address: String,
        distanceToEarthquake: String
      },
      {
        typeKey: "$type"
      }
    );
  
    const Gempa = mongoose.model("gempa", schema, "gempa");
    return Gempa;
};