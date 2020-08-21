var mongoose = require('mongoose');

var shopSchema=mongoose.Schema({
    shopName: String,
    ownerName:String,
    address:String,
    city:String,
    mobile:String,
    business:String,
});

var Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;