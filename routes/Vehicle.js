const express = require('express');
const router = express.Router();

const vehical = require('../models/vehicle.model');

router.get('/view',(req,res)=>{
    vehical.find()
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load vehical 
router.get('/load',(req,res)=>{
    vehical.find({IsDeleted:false,ExpiryDate:null})
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add vehical
router.post('/add',function(req,res){

    vehical.find({vehicleCategory:req.body.vehicleCategory,vehicleNumber:req.body.vehicleNumber}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" vehical Already Added ! "});
             console.log(docs.length);      
        }
        else{
                var newvehical = new vehical(req.body);  

                newvehical.save()
                    .then(mydata=>{
                        res.status(200).json({status:true,msg:" vehical Added Succssfully ! "});
                    })
                    .catch(err=>{
                        res.status(400).json({status:true,msg:" Unable to Save the Database! "});
                    });
         }
    });
});

//delete vehical
router.post('/onDelete',function(req,res){
    
    vehical.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:"vehical Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete vehical active
router.post('/onActive',function(req,res){
    
    vehical.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:"vehical Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});


//update
router.post('/onUpdate',function(req,res){

    vehical.find({
        vehicleCategory:req.body.vehicleCategory,
        vehicleNumber:req.body.vehicleNumber,
        comment:req.body.comment
    }).exec((err,docs)=>{
         if(docs.length){
             res.status(200).json({status:false,msg:" vehical Already Added ! "});
             console.log(docs.length);      
        }
        else{
            
            vehical.findOneAndUpdate(
               
                {_id:req.body._id},
                { $set:
                    {
                        vehicleCategory:req.body.vehicleCategory,
                        vehicleNumber:req.body.vehicleNumber,
                        comment:req.body.comment,
                        ModificationDate:Date.now()
                    }
                },
                {new:true})
            .then(my=>{
                res.status(200).json({status:true,msg:"vehical Update Succssfully!"});
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