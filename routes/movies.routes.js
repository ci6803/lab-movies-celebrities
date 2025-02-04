// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// all your routes here
const Movie = require("../models/Movie.model");

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebDb) => {
      res.render("movies/new-movie", { celebDb });
    })
    .catch((err) => console.log("err"));
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))

    .catch((err) => console.error(`Err while creating the movie: ${err}`));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((allMovie) => res.render("movies/movies", { allMovie }))
    .catch((error) => `Error while fetching all movies: ${error}`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details", movie))
    .catch((err) => console.log("err", err));
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => console.log(`Error while deleting a book: ${error}`));
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  Movie.findById(id);
  Celebrity.find(id)
    .then((movieEdit) => {
      res.render("movies/edit-movie", movieEdit);
    })
    .catch((error) => `Error while getting a movie to edit: ${error}`);
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((updatedMovie) => res.redirect(`/${updatedMovie._id}`))
    .catch((error) => console.log(`Error while updating a movie: ${error}`));
});

module.exports = router;
