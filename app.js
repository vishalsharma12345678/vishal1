const express = require('express')
const app = express()
const path  = require('path')
const session = require('express-session')
const cons = require('cors')
const cookieParser = require('cookie-parser')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())
app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  
app.use(session({secret: 'vishalmsbdfjk', resave: false, saveUninitialized: false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',require('./router'))
app.listen(4000,()=>{
    console.log("http://localhost:3000")
})