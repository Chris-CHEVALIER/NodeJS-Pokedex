var router = require("express").Router();

var Pokemon = require("./../models/Pokemon");

router.get("/", (req, res) => {
    Pokemon.find({})
        .populate("types")
        .then(pokemons => {
            res.render("pokemons/index.html", { pokemons: pokemons });
        });
});

module.exports = router;
