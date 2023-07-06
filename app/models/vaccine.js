module.exports = (mongoose) => {
    let schema = mongoose.Schema(
        {
            totalsasaran: String,
            sasaranvaksinsdmk: String,
            sasaranvaksinlansia: String,
            sasaranvaksinpetugaspublik: String,
            vaksinasi1: String,
            vaksinasi2: String
        },      
        {
            typeKey: "$type"
        }
    );
  
    const Vaccine = mongoose.model("vaccine", schema, "vaccine");
    return Vaccine;
};