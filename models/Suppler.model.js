const mongoose = require('mongoose');
const schema = mongoose.Schema;

const supplerSchema = new schema({

    productname:String,
    details:String,
    name:String,
    street:String,
    city:String,
    telephone:Number,
    mobile:Number,
    email:String,
    regNo:String,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('Suppler',supplerSchema);