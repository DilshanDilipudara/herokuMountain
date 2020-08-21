const express = require('express');
const router = express.Router();

const metric = require('../models/metrics.model');

router.get('/view',(req,res)=>{
    
    metric.find()
     .then( myMetric =>{
       
         res.status(200).json({data:myMetric});
      
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load Metrics 
router.get('/load',(req,res)=>{
    metric.find({IsDeleted:false,ExpiryDate:null})
     .then( myMetric =>{
         res.status(200).json({data:myMetric});
         //console.log(myMetric);
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add metrics
router.post('/addmetrics',function(req,res){

 
    metric.find({Measure:req.body.Measure}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" Metrics Already Added ! "});
             console.log(docs.length);      
        }
        else{
                var newMetrics = new metric(req.body);  

                newMetrics.save()
                    .then(myMetrics=>{
                        res.status(200).json({status:true,msg:" Metrics Added Succssfully ! "});
                    })
                    .catch(err=>{
                        res.status(400).json({status:true,msg:" Unable to Save the Database! "});
                    });
         }
    });
});

//delete Metrics
router.post('/onDelete',function(req,res){
    
    metric.findOneAndUpdate(
            {_id:req.body.metricsID},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(myMetrics=>{
            res.status(200).json({status:true,msg:"Metrics Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete metrics active
router.post('/onActive',function(req,res){
    
    metric.findOneAndUpdate(
            {_id:req.body.metricsID},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(myMetrics=>{
            res.status(200).json({status:true,msg:"Metrics Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Update
router.post('/onUpdate',function(req,res){
    
    metric.find({Measure:req.body.mersure}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" Metrics Already Added ! "});
             console.log(docs.length);      
        }
        else{
            metric.findOneAndUpdate(
                {_id:req.body._id},
                { $set:{Measure:req.body.mersure,ModificationDate:Date.now()}},
                {new:true})
            .then(myMetrics=>{
                res.status(200).json({status:true,msg:"Metrics Update Succssfully!"});
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