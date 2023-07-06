module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      number: Number,
      question: String,
      answer: String
    },
    {
      typeKey: "$type"
    }
  );

  const Faq = mongoose.model("faq", schema, "faqs");
  return Faq;
};