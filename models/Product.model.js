const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({

    productName:String,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('Product',productSchema);