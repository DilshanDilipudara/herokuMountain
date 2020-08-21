const mongoose = require('mongoose');
const schema = mongoose.Schema;

const warehouseShcema = new schema({
    
    supplerID:String,
    date:Date,
    orderNumber:String,
    invoice:String,
    comment:String,
    SupplerInvoiceID:String,
    TotalSellNetValue:Number,
    TotalBuyNetValue:Number,
    TotalSellLineDiscount:Number,
    TotalBuyLineDiscount:Number,
    TotalSellGrossValue:Number,
    TotalBuyGrossValue:Number
});