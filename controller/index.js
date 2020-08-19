const express = require('express');
const session = require('express-session')
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config();
const mainRouter=require('./Router/router');
const bookRouter=require('./Router/bookRouter');
const studentRouter = require('./Router/studentsRouter');
const resourceRouter = require('./Router/resourseRouter');
require('./DB/db');


const app = express();
const IN_PROD = process.env.NODE_ENV === 'production';
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(session({
    name: process.env.SESSION_NAME,
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET,
    cookie:{
        path: '/',
        maxAge: Number(process.env.LIFESPAN) *1000,
        sameSite:true,
        secure: IN_PROD,
    }
}));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));


app.use('/',mainRouter);
app.use('/Book',bookRouter);
app.use('/Student',studentRouter);
// app.use('/Resource',resourceRouter);

const port =process.env.PORT || 5000;


app.listen(port, (error,result) => {
    if(error){
        return console.log(error);
    }
    console.log('Server is up and running on port 5000!');
});
