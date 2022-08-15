const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// const celebrities = require("./celebrities.routes");
// router.use("/celebrities/", celebrities);

// const movies = require("./movies.routes");
// router.use("/movies/", movies);

module.exports = router;
