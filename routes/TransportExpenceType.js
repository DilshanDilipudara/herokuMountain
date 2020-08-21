const express = require('express');
const router = express.Router();

const TransportExpenceType = require('../models/TransportExpenceType.model');

router.get('/view',(req,res)=>{
    TransportExpenceType.find()
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load TransportExpenceType 
router.get('/load',(req,res)=>{
    TransportExpenceType.find({IsDeleted:false,ExpiryDate:null})
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add TransportExpenceType
router.post('/add',function(req,res){

 
    TransportExpenceType.find({TransportExpencesType:req.body.TransportExpencesType}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" ExpenceType Already Added ! "});
             console.log(docs.length);      
        }
        else{
                var newTransportExpenceType = new TransportExpenceType(req.body);  

                newTransportExpenceType.save()
                    .then(mydata=>{
                        res.status(200).json({status:true,msg:" ExpenceType Added Succssfully ! "});
                    })
                    .catch(err=>{
                        res.status(400).json({status:true,msg:" Unable to Save the Database! "});
                    });
         }
    });
});

//delete TransportExpenceType
router.post('/onDelete',function(req,res){
    
    TransportExpenceType.findOneAndUpdate(
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

//Delete TransportExpenceType active
router.post('/onActive',function(req,res){
    
    TransportExpenceType.findOneAndUpdate(
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
    
    TransportExpenceType.find({TransportExpencesType:req.body.TransportExpencesType}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" Expence Type Already Added ! "});
            
        }
        else{
            TransportExpenceType.findOneAndUpdate(
                {_id:req.body._id},
                { $set:{TransportExpencesType:req.body.TransportExpencesType,ModificationDate:Date.now()}},
                {new:true})
            .then(data=>{
                res.status(200).json({status:true,msg:"Expence Type Update Succssfully!"});
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