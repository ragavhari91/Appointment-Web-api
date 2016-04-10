var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');

var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:28017/appointmentdb',function(error){
    if(error){
         res.json(error);
    }
});


//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});


var userdata = new User(
    {
        firstName:"Ragav",
        lastName:"Hari",
        emailID:"mynameisragav@gmail.com",
        mobileNo:"8056598186",
        password:"Ragav@123"
    });
    
var listuser = new User();    

/* Create user */
router.get('/create', function(req, res, next) {

    // save data to mongodb   
    userdata.save(function(error){
        if(error){
            res.json(error);
        }
        else{
            res.json(userdata);
        }
    });
   
});

/* List all users */
router.get('/all', function(req, res, next) {
 // res.send('respond with a resource');
    
    
    User.find({},function(error,data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
   
});

/* List particular user */
router.get('/:id', function(req, res, next) {
 // res.send('respond with a resource');
    
    
    User.findOne({lastName:"Hari"},function(error,data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
   
});



module.exports = router;
