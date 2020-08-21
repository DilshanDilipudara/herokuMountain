const mongoose = require('mongoose');
const schema = mongoose.Schema;

const vehical = new schema({
   
       
    vehicleCategory:String,
    vehicleNumber:String,
    comment:String,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('Vehical',vehical);