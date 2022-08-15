const { application } = require("express");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res) => res.render("celebrities/new-celebrity"));

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("celebrities/celebrities"))
    .catch((error) => res.render("celebrities/new-celebrity"));
});

router.get("/", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities", { allCelebrities })
    )
    .catch((error) => `Error while fetching all celebrities: ${error}`);
});

module.exports = router;
