module.exports = (mongoose) => {
    let schema = mongoose.Schema(
    {
        username: String,
        password: String
    },
    {
        typeKey: "$type"
    });

    const User = mongoose.model("user", schema, "users");
    return User;
};