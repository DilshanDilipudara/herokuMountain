var mongoose = require('mongoose');

var userSchema=mongoose.Schema({
    username: String,
    password:String,
    fname:String,
    lname:String,
    mobile:Number,
    email:String,
    nic:String,
    status:{
        type:String,
        default:"Inactive"
    },
    role:{
        type:String,
        default:"medRep"
    },
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    DeletedDate:{type:Date,default:null}

});

var User = mongoose.model('User', userSchema);
module.exports = User;
