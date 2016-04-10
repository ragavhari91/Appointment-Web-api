var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User     = new Schema({
   
   firstName : {type:String,required:true},
   lastName  : {type:String,required:true},
   emailID   : {type:String,required:true},
   mobileNo  : {type:String,required:true},
   password  : {type:String,required:true}
    
});


module.exports = mongoose.model('User',User);