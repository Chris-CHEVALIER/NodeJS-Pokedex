var router = require("express").Router();

var Pokemon = require("./../models/Pokemon");
var Type = require("./../models/Type");

router.get("/", (req, res) => {
    Pokemon.find({})
        .populate("types")
        .then(pokemons => {
            res.render("pokemons/index.html", { pokemons: pokemons });
        });
});

router.get("/new", (req, res) => {
    Type.find({}).then(types => {
        var pokemon = new Pokemon();
        res.render("pokemons/edit.html", { pokemon: pokemon, types: types });
    });
});

router.get("/edit/:id", (req, res) => {
    Type.find({}).then(types => {
        Pokemon.findById(req.params.id).then(pokemon => {
            res.render("pokemons/edit.html", {
                pokemon: pokemon,
                types: types
            });
        });
    });
});

router.get("/:id", (req, res) => {
    Pokemon.findById(req.params.id)
        .populate("types")
        .then(
            pokemon => {
                res.render("pokemons/show.html", { pokemon: pokemon });
            },
            err => res.status(500).send(err)
        );
});

module.exports = router;
