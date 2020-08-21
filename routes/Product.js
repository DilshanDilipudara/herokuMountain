const express = require('express');
const router = express.Router();

const product = require('../models/Product.model');

//view 
router.get('/view',(req,res)=>{
    product.find()
     .then( myProduct =>{
         res.status(200).json({data:myProduct})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load Product 
router.get('/load',(req,res)=>{
    product.find({IsDeleted:false,ExpiryDate:null})
     .then( myProduct=>{
         res.status(200).json({data:myProduct})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add product
router.post('/add',function(req,res){

    var newProduct = new product(req.body);  

    newProduct.save()
        .then(myProduct=>{
            res.status(200).json({status:true,msg:"Product  Add Succssfully!"});
        })
        .catch(err=>{
            res.status(400).send("Unable to Save the Database!");
        });
});

//delete 
router.post('/onDelete',function(req,res){
    
    product.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(myProduct=>{
            res.status(200).json({status:true,msg:"product Delete Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete  active
router.post('/onActive',function(req,res){
    
    product.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(myProduct=>{
            res.status(200).json({status:true,msg:"product Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Update
router.post('/onUpdate',function(req,res){
    
    product.find({productName:req.body.productName}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" product Already Added ! "});
            
        }
        else{
            product.findOneAndUpdate(
                {_id:req.body._id},
                { $set:{productName:req.body.productName,ModificationDate:Date.now()}},
                {new:true})
            .then(data=>{
                res.status(200).json({status:true,msg:"product Update Succssfully!"});
                console.log("true");
            })
            .catch(err=>{
                res.status(400).send(err);
                console.log(err);
            });
         }
    });
    
    
    
});

module.exports = router;