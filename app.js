var express = require('express'),
	engine = require('ejs-mate'),
    app = express();

var bodyParser = require('body-parser');

app.engine('ejs', engine);
 
app.set('views',__dirname + '/views');
app.set("view engine", "ejs");

//javascript link
app.use(express.static(__dirname + "/public"));

var library = [{
        bookID: 1000,
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        year: 1865
    }];
var title;
var author;
var year;
var bookID = 1000;
var certainBook;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(req, res) {
    res.render('index', {
        library: library
    });
});

// List all books


// Add one book
app.post('/book', function (req, res) {
	title = req.body.title;
	author = req.body.author;
	year = req.body.year;
	bookID += 1;
	newBook = {
        bookID: bookID,
        title: title,
        author: author,
        year: year
    };
    library.push(newBook);
    console.log(req.body);
	res.redirect("/");
});

// Get one book
app.get('/book/:id', function (req, res) {
	res.redirect("/");
});

// Update one book
app.get('/book/:id/edit', function (req, res) {
	library.forEach(function (el) {
		if(el.bookID === Number(id)) {
			el = certainBook;
		}
	});
	res.render('edit', {
        newBook: newBook
    });
});

app.put('/book/:id', function (req, res) {
var id = req.params.id;
	library.forEach(function (el) {
			el.title = req.body.el.title;
			el.author = req.body.el.author;
			el.year = req.body.el.year;
	});
	if(!certainBook){
		res.render('404');
	}
	res.redirect("/");
});

// Delete one book
app.delete('/book/:id', function (req, res) {
var id = req.params.id;
	library.forEach(function (el) {
		if(el.bookID === id) {
			library.splice(library.indexOf(el), 1);	
		}
	});
	res.redirect("/");

});



app.listen(3000, function() {
    console.log("Starting a server on localhost: 3000");
});