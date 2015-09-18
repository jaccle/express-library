var express = require('express'),
    engine = require('ejs-mate'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    db = require('./models'),
    app = express();
var request = require('request');

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");


//stylesheet link
app.use(express.static(__dirname + "/public"));


// method-override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // for parsing application/json

app.get('/searchresults', function(req, res) {
    var query = req.query.search;
    console.log(query);
    var url = 'http://www.omdbapi.com/?t=' + query;
    request(url, function(err, omd_res, body) {
        if (err) {
            console.log("Error, sorry"); //response
        } else if (!err && omd_res.statusCode === 200) {
            console.log(body);
            res.render('results', {
                movieGrab: JSON.parse(body)
            }); //pos body
        }
    });
});


app.get('/', function(req, res) {
    db.Movie.find({}, function(err, doc) {
        console.log(doc);
        res.render('index', {
            movies: doc
        });
    });
});

// Add one movie
app.post('/movies/:id', function(req, res) {
    console.log(req.body);
    db.Movie.create(req.body.movie, function(err, doc) {
        res.redirect("/");
    });
    console.log(req.body);
});

// Get one movie
app.get('/movies/:id/', function(req, res) {
    var id = req.params.id;
    db.Movie.findById(id, function(err, doc) {
        if (doc) {
            res.render('show', {
                movie: doc
            });
        } else {
            res.render('404');
        }
    });
});

// Update one movie
// app.get('/movies/:id', function(req, res) {
//     var id = req.params.id;
//     db.Movie.findById(id, function(err, doc) {
//         res.redirect('/');
//     });
// });

// app.put('/movies/:id', function(req, res) {
//     var id = req.params.id;
//     var title = req.body.title,
//         author = req.body.author,
//         year = req.body.year;
//     db.Movie.findByIdAndUpdate(id, req.body, function(err, doc) {
//         if (doc) {
//             res.redirect("/");

//         } else {
//             res.render('404');
//         }
//     });
// });

// Delete one movie
app.delete('/movies/:id', function(req, res) {
    var id = req.params.id;
    db.Movie.findByIdAndRemove(id, req.body, function(err, doc) {
        if (doc) {
            res.redirect("/");
        }
    });
});



app.listen(3000, function() {
    console.log("Starting a server on localhost: 3000");
});
