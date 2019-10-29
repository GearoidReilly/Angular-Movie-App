const express = require('express')
const app = express()
const port = 3000
//Necessary to load html files
const path = require('path')
//Needed for interpreting post requests
const bodyParser = require('body-parser')
//Needed for Cross Origin Resource Sharing(CORS)
const cors = require('cors');
//Needed to connect to the mongo db
const mongoose = require('mongoose');

//Connection string to mongodb
var mongoDB = 'mongodb+srv://Admin:12345@cluster0-tdowq.mongodb.net/test?retryWrites=true&w=majority';
//Connect to database
mongoose.connect(mongoDB, {useNewUrlParser:true});

//Get reference to schema
const Schema = mongoose.Schema;
//Create new schema for movies
const movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
})

//Create model for the database
const MovieModel = mongoose.model("MovieInfo", movieSchema);

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

//Returns the request when user searches for app
app.get('/', (req, res) => res.send('Hello World!'))

//Returns the request when the user searches for app/hello, pass name as a parameter
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send("Hello " + req.params.name)
})

app.get('/api/movies', (req, res, next) => {
    const movies = /*[
        {
            "Title":"Avengers: Infinity War",
            "Year":"2018",
            "imdbID":"tt4154756",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
            },
            {
            "Title":"Captain America: Civil War",
            "Year":"2016",
            "imdbID":"tt3498820",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
            },
            {
            "Title":"World War Z",
            "Year":"2013",
            "imdbID":"tt0816711",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
            ,{
            "Title":"War of the Worlds",
            "Year":"2005",
            "imdbID":"tt0407304",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
            }
        ]*/
        //Used to retrieve data from the movie model
    MovieModel.find((err,data) => {
        res.json({movies:data});
    })             

    /*res.status(200).json({
        message: "Json retrieved successfully",
        myMovies:movies
    })*/
    //res.send("my api")
})

//Used to get a movie by id
app.get('/api/movies/:id', (req, res, next) => {
    console.log(req.params.id);
    MovieModel.findById(req.params.id, function (err, data) {
        res.json(data);
    });
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    //Used to load a file through the server
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/name', (req, res) => {
    console.log('route calling');

    res.send("Hello " + req.query.firstname + " " + req.query.lastname)
})

app.post('/name', (req, res) => {
    console.log('post calling');
    console.log(req.body.firstname + " " + req.body.lastname);

    res.send("Hello from post: " + req.body.firstname + " " + req.body.lastname)

})

app.post('/api/movies', (req,res) =>{
    console.log('post Sucessfull');
    console.log(req.body)
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    //Create a movie using the information entered to the database
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });
    res.json("Data uploaded")
})
    

app.listen(port, () => console.log(`Example app listening on port ${port}!`))