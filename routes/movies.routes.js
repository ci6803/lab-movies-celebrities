// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//const Celeb = require("../models/Celebrity.model");
// all your routes here
const Movie = require("../models/Movie.model");

router.get("/create", (req, res) => res.render("movies/new-movie"));

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/"))

    .catch((err) => console.error(`Err while creating the movie: ${err}`));
});

router.get("/", (req, res) => {
    Movie.find()
      .then((allMovie) =>
        res.render("movies/movies", { allMovie })
      )
      .catch((error) => `Error while fetching all movies: ${error}`);
  });

module.exports = router;
