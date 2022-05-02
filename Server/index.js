//Initializing the Express Server for Backend
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//Initializing the mysql
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', //Write your defined Password
    database: '' //Write your database name 
});

//Sending a response to frontend at this particular address
//res is used for sending respose to frontend and req is used for requesting something
// app.get("/", (req,res)=>{
//     //Connection Test
//     // const sqlInsert = "INSERT INTO moviename (moviename,moviereview) VALUES ('Inception', 'Good Movie') ";
//     // db.query(sqlInsert, (err,result)=>{
//     //     res.send("Hello World");
//     // })
// })

//MiddleWare to avoid Errors
app.use(cors());
//Converting the frontend object as json for the backend
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Read
app.get("/api/get", (req,res)=>{
    const sqlSelect = "SELECT * FROM moviename";
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
})

//Insert
app.post("/api/insert", (req,res)=> {
    //Req the variables from the frontEnd
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO moviename (moviename,moviereview) VALUES (?,?) ";
    db.query(sqlInsert, [movieName, movieReview], (err,result)=>{
        console.log(result);
    })
})

//Delete
app.delete("/api/delete/:movieName", (req,res)=>{
    //Req the moviename to delete Movie
    const movieName = req.params.movieName;
    const sqlDelete = "DELETE FROM moviename WHERE moviename = ?";

    //For one variable we don't need an array
    db.query(sqlDelete, movieName, (err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

//Update
app.put("/api/update", (req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlUpdate = "UPDATE moviename SET moviereview = ? WHERE moviename = ?";

    db.query(sqlUpdate, [movieReview,movieName], (err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

//Since we are running our app on localhost:3000 lets run this backend Express server on localhost:3001
app.listen(3001, ()=>{
    console.log("Server running on Port 3001");
})
