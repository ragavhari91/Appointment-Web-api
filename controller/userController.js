var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
var Response = require('../model/response');
var async = require('async');

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



    
var listuser = new User();    

/* Create user */
router.post('/create', function(req, res, next) {
        
    var user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        emailID:req.body.emailID,
        mobileNo:req.body.mobileNo,
        password:req.body.password
    });
    
    var resp = {};
    
    async.parallel([
        function(callback)
        {
          User.find().count({$or:[{'emailID':req.body.emailID},{'mobileNo':req.body.mobileNo}]},function(err,count,next){
              callback(count);
          });
          
        },
        function(callback){
            callback();
        }
    ],function(result){
        if(result <= 0){
            user.save(function(error,data){
                
                if(error){
                    resp.status = "Failure";
                    resp.message = "User Creation Failed";
                    resp["content"] = error;
                    
                    res.json(resp);
                }
                else{
                    resp.status = "Success";
                    resp.message = "User Created Successfully";
                    resp["content"] = data;
                    
                    res.json(resp);
                }
            });
        }
        else{
            resp.status = "Failure";
            resp.message = "User Already Exists";
            res.json(resp);
        }
    });
   
});

function checkuser(email,mobile){
    
    var count = 0;
    User.find().count({$or:[{'emailID':"jj"},{'mobileNo':"8056598186"}]},function(err,count){
         if(err){
            data = 0;
         }
         else{
             data = count;
         }
     });
     
     return data;
}


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
    
    User.findOne({lastName:"Hari"},function(error,data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
   
});


/* User Login */
router.post('/login', function(req, res, next) {
    
    User.findOne({emailID:req.body.emailID},function(error,data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
   
});


module.exports = router;
