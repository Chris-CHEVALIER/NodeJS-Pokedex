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
        res.render("pokemons/edit.html", {
            pokemon: pokemon,
            types: types,
            endpoint: "/"
        });
    });
});

router.get("/edit/:id", (req, res) => {
    Type.find({}).then(types => {
        Pokemon.findById(req.params.id).then(pokemon => {
            res.render("pokemons/edit.html", {
                pokemon: pokemon,
                types: types,
                endpoint: "/" + pokemon._id.toString()
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

router.post("/:id?", (req, res) => {
    new Promise((resolve, reject) => {
        if (req.params.id) {
            Pokemon.findById(req.params.id).then(resolve, reject);
        } else {
            resolve(new Pokemon());
        }
    })
        .then(pokemon => {
            pokemon.name = req.body.name;
            pokemon.number = req.body.number;
            pokemon.description = req.body.description;
            pokemon.types = req.body.types;

            if (req.file) pokemon.picture = req.file.filename;
            return pokemon.save();
        })
        .then(() => {
            res.redirect("/");
        }),
        err => console.log(err);
});

module.exports = router;
