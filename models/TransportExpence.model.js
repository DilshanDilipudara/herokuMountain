const mongoose = require('mongoose');
const schema = mongoose.Schema;

const trasportExpence = new schema({
   
    ExpencesType:{type:String},
    date:{type:Date},
    vehical:String,
    cost:Number,
    description:String,
    comment:String,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('TrasportExpence',trasportExpence);