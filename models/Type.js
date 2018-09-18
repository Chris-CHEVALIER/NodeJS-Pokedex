var mongoose = require("mongoose");

var typeSchema = new mongoose.Schema({
    name: String,
    color: {
        type: String
    },
    picture: String
});

typeSchema.virtual("pokemons", {
    ref: "Pokemon",
    localField: "_id",
    foreignField: "types"
});

var Type = mongoose.model("Type", typeSchema);
module.exports = Type;
