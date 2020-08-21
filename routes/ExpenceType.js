const express = require('express');
const router = express.Router();

const ExpenceType = require('../models/ExpenceType.model');

router.get('/view',(req,res)=>{
    ExpenceType.find()
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load ExpenceType 
router.get('/load',(req,res)=>{
    ExpenceType.find({IsDeleted:false,ExpiryDate:null})
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add ExpenceType
router.post('/add',function(req,res){

 
    ExpenceType.find({ExpencesType:req.body.ExpencesType}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" ExpenceType Already Added ! "});
             console.log(docs.length);      
        }
        else{
                var newExpenceType = new ExpenceType(req.body);  

                newExpenceType.save()
                    .then(mydata=>{
                        res.status(200).json({status:true,msg:" ExpenceType Added Succssfully ! "});
                    })
                    .catch(err=>{
                        res.status(400).json({status:true,msg:" Unable to Save the Database! "});
                    });
         }
    });
});

//delete ExpenceType
router.post('/onDelete',function(req,res){
    
    ExpenceType.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:"ExpenceType Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete ExpenceType active
router.post('/onActive',function(req,res){
    
    ExpenceType.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:"ExpenceType Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Update
router.post('/onUpdate',function(req,res){
    
    ExpenceType.find({ExpencesType:req.body.ExpencesType}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" ExpenceType Already Added ! "});
            
        }
        else{
            ExpenceType.findOneAndUpdate(
                {_id:req.body._id},
                { $set:{ExpencesType:req.body.ExpencesType,ModificationDate:Date.now()}},
                {new:true})
            .then(data=>{
                res.status(200).json({status:true,msg:"ExpenceType Update Succssfully!"});
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