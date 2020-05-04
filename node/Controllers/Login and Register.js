const express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var router = express.Router();
module.exports = router;

var BCRYPT_COUNT = 10;

//Moongoose Schema
var userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    address: String
});

var User = mongoose.model('User', userSchema);



router.post('/register', (req,res) => {
    var bcryptPassword = bcrypt.hashSync(req.body.password, BCRYPT_COUNT); 
    var user = new User({
        username: req.body.userName,
        password: bcryptPassword,
        email: req.body.email,
        address: req.body.address
    });
    user.save((err, doc)=>{
        if(!err && doc!=null){
            res.send({'Message':'Registration successful'});
        }else{
            res.send({'Message':'Registration failed'});
        }
    });
})

router.post('/login',(req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    User.findOne({username: userName}).exec(function(err, user) {
        if(user === null){
            res.send({'Message':'User not exists'});
        }else{
            const isMatch = bcrypt.compareSync(password, user.password);
            if(!isMatch){
                res.send({'Message':'User not exists'}); 
            }else{
                var response = { 'Message': 'Login Successful',
                             'userName': user.username }
                res.send(response);
            }
        }
    })
});

