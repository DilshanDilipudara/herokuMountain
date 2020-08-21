
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ArticalSchema = new schema({

    categoryName:{type:String},
    metricsName:String,
    buying:Boolean,
    selling:Boolean,
    comment:String,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}

});

module.exports = mongoose.model('ArticalCategory',ArticalSchema)

