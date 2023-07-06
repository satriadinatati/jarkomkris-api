module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {        
        name: String,
        weather: String,
        badge: String,
        humidity: String,
        wind: String,
        disasterPotential: String 
      },
      {
        typeKey: "$type"
      }
    );
  
    const Weather = mongoose.model("weather", schema, "weathers");
    return Weather;
};