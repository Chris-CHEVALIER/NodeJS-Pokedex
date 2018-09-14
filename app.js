var express = require("express");
var mongoose = require("mongoose");
var nunjucks = require("nunjucks");

mongoose.connect(
    "mongodb://localhost/pokedex",
    { useNewUrlParser: true }
);

require("./models/Pokemon");
require("./models/Type");

var app = express();

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/images", express.static(__dirname + "/images"));

app.use("/", require("./routes/pokemons"));
app.use("/types", require("./routes/types"));

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

console.log("Pokédex lancé sur le port 3000");

app.listen(3000);
