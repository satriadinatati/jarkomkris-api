module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        date: String,
        title: String,
        content: String,
        image: String
      },
      {
        typeKey: "$type"
      }
    );
  
    const Article = mongoose.model("article", schema, "articles");
    return Article;
};