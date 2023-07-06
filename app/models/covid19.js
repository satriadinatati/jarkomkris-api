module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        provinsi: String,
        dirawat: Number,
        kasus: String,
        sembuh: String,
        meninggal: String,
        penambahan: {
            pPositif: Number,
            pSembuh: Number,
            pMeninggal: Number 
        },
        kelompok_umur_anak: Number,
        kelompok_umur_remaja: Number,
        kelompok_umur_dewasa: Number,
        kelompok_umur_tua: Number,
        kelompok_umur_lansia: Number,
        kelompok_umur_lanjut: Number,
        last_date: String
      },
      {
        typeKey: "$type"
      }
    );
  
    const Covid = mongoose.model("covid", schema, "covid");
    return Covid;
};