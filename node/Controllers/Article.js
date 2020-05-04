const express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
module.exports = router;

//Moongoose Schema
var articleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String,
    author: String
});

var Article = mongoose.model('Article', articleSchema);

router.post('/createArticle', (req,res) => {
    var article = new Article({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });
    article.save((err, doc)=>{
        if(!err && doc!=null){
            res.send({'Message':'Article created successfully'});
        }else{
            res.send({'Message':'Article creation failed'});
        }
    });
})

router.get('/articleList',(req, res) => {
    Article.find().exec(function(err, list) {
        res.send({'List': list});
    });
    
});

