const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const artical = require('../models/ArticalCategory.model');
const metricsModel = require('../models/metrics.model');

//add
router.post('/add',function(req,res){

    artical.find({categoryName:req.body.categoryName,metricsName:req.body.metricsName}).exec((err,docs)=>{
        if(docs.length){
            res.status(200).json({status:false,msg:" ArticalCategory Already Added ! "});
       }
       else{
            
            var newArtical = new artical(req.body); 
            newArtical.save()
                .then(data =>{
                    res.status(200).json({status:true,msg:"ArticalCategory Added Succssfully!"});
                })
                .catch(err=>{
                    res.status(400).send("Unable to Save the Database!");
                });
        }
    })
});



//view
router.get('/view',(req,res)=>{

    artical.find()
     .then( myArtical =>{
         res.status(200).json({data:myArtical})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load
router.get('/load',(req,res)=>{
    artical.find({IsDeleted:false,ExpiryDate:null})
     .then( myArtical =>{
         res.status(200).json({data:myArtical})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//delete Artical
router.post('/onDelete',function(req,res){
  
    artical.findOneAndUpdate(
            {_id:req.body.ArticalID},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(myArtical=>{
            res.status(200).json({status:true,msg:"ArticalCategory Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete Artical active
router.post('/onActive',function(req,res){
    
    artical.findOneAndUpdate(
            {_id:req.body.ArticalID},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(myArtical=>{
            res.status(200).json({status:true,msg:"ArticalCategory Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//update
router.post('/onUpdate',function(req,res){
    console.log(req.body);
    artical.find({
        categoryName:req.body.categoryName,
        metricsName:req.body.metricsName,
        buying:req.body.buying,
        selling:req.body.selling,
        comment:req.body.comment
    }).exec((err,docs)=>{
         if(docs.length){
             res.status(200).json({status:false,msg:" ArticalCategory Already Added ! "});
             console.log(docs.length);      
        }
        else{
            console.log(req.body)
            artical.findOneAndUpdate(
               
                {_id:req.body._id},
                { $set:
                    {
                        categoryName:req.body.categoryName,
                        metricsName:req.body.metricsName,
                        buying:req.body.buying,
                        selling:req.body.selling,
                        comment:req.body.comment,
                        ModificationDate:Date.now()
                    }
                },
                {new:true})
            .then(my=>{
                res.status(200).json({status:true,msg:"ArticalCategory Update Succssfully!"});
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