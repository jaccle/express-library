
var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
                   Title: String,
                   Director: String,
                   Year: String,
                   Rated: String,
                   Genre: String,
                   Actors: String,
                   Plot: String,
                   Awards: String,
                   Poster: String,
                   imdb: String
                  });


var Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;