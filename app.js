var express = require("express");
var mongoose = require("mongoose");
var nunjucks = require("nunjucks");
var multer = require("multer");

var upload = multer({
    dest: __dirname + "/uploads"
});

mongoose.connect(
    "mongodb://localhost/pokedex",
    { useNewUrlParser: true }
);

require("./models/Pokemon");
require("./models/Type");

var app = express();

app.use(upload.single("file")); // Cf. Image in "edit.html"

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/images", express.static(__dirname + "/images"));

app.use("/types", require("./routes/types"));
app.use("/", require("./routes/pokemons"));

app.use("/uploads", express.static(__dirname + "/uploads"));

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

console.log("Pokédex lancé sur le port 3000");

app.listen(3000);
