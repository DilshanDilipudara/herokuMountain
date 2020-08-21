const mongoose = require('mongoose');
const schema = mongoose.Schema;

const expence = new schema({
   
    ExpencesType:{type:String},
    date:{type:Date},
    cost:Number,
    description:String,
    comment:String,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('Expence',expence);

