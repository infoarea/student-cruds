
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const expressLayout = require('express-ejs-layouts')
const studentRoute = require('./routes/studentRoute')


//express init
const app = express();

//env init
dotenv.config();
const PORT = process.env.SERVER_PORT || 4000;
//json data mange
app.use(express.json());
app.use(express.urlencoded( { extended : false } ));

//folder static
app.use(express.static('public'))


 //ejs init
 app.set("view engine", "ejs");

 app.use(expressLayout);
 app.set('layout', 'layouts/app')


 //Student Route
 app.use('/student', studentRoute)

 app.listen(PORT, ()=>{
    console.log(`Server is running`.bgGreen.black);
 })

