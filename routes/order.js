var express = require("express");
var router = express.Router();

var Order = require('../models/order.model')

router.post('/add',(req,res)=>{
    let order = new Order(req.body);
    order.save().then(shop=>{
        res.json({status:"200",msg:"Order added succesfully!!"});
      }).catch(err=>{
        res.send(err);
      })
})

router.get('/all',(req,res)=>{
  Order.find().then(order=>{
    res.json({data:order})
  }).catch(err=>{
    res.status(400).send(err);
  })
})

module.exports = router;
