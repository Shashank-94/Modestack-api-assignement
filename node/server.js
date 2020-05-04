const express = require('express')
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 

var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use(cors());

app.all("/*",function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", 'DELETE, PUT, POST, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
})

 
mongoose.connect('mongodb://localhost:27017/Api_DB', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

app.listen(8000, () => {
    console.log('Api app listening on port 8000!')
});

let Auth = require('./Controllers/Login and Register');
let Article = require('./Controllers/Article');

app.use('/users', Auth);
app.use('/article', Article);