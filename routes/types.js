var router = require("express").Router();

var Type = require("./../models/Type");

router.get("/new", (req, res) => {
    var type = new Type();
    res.render("types/edit.html", {
        type: type,
        endpoint: "/"
    });
});

router.get("/edit/:type", (req, res) => {
    Type.findOne({ name: req.params.type }).then(type => {
        res.render("types/edit.html", {
            type: type,
            endpoint: "/"
        });
    });
});

router.get("/delete/:type", (req, res) => {
    Type.findOneAndRemove({ name: req.params.type }).then(() => {
        res.redirect("/");
    });
});

router.get("/:type", (req, res) => {
    Type.findOne({ name: req.params.type })
        .populate("pokemons")
        .then(
            type => {
                if (!type) {
                    return res.status(404).send("Type introuvable");
                }
                res.render("types/show.html", {
                    type: type,
                    pokemons: type.pokemons
                });
            },
            err => console.log(err)
        );
});

router.post("/:id?", (req, res) => {
    console.log("POST brudru");

    new Promise((resolve, reject) => {
        if (req.params.id) {
            Type.findById(req.params.id).then(resolve, reject);
        } else {
            resolve(new Type());
        }
    })
        .then(type => {
            type.name = req.body.name;
            type.color = req.body.color;

            if (req.file) type.picture = req.file.filename;
            return type.save();
        })
        .then(() => {
            res.redirect("/");
        }),
        err => console.log(err);
});

module.exports = router;
