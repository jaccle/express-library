var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book_app");

module.exports.Movie = require("./book");