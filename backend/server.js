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
    const movies = 
        //Used to retrieve data from the movie model
    MovieModel.find((err,data) => {
        res.json({movies:data});
    })             
})

app.delete('/api/movies/:id', (req,res) =>{
    console.log(req.params.id);

    //Delete the movie from the database
    MovieModel.deleteOne({_id:req.params.id},(error,data) => {
        //Check for error
        if(error){
            res.json(error);
        }
        res.json(data);
    })
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