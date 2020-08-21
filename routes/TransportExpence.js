const express = require('express');
const router = express.Router();

const transportExpence = require('../models/TransportExpence.model');

router.get('/view',(req,res)=>{
    transportExpence.find()
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load transportExpence 
router.get('/load',(req,res)=>{
    transportExpence.find({IsDeleted:false,ExpiryDate:null})
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add transportExpence
router.post('/add',function(req,res){
    var newtransportExpence = new transportExpence(req.body);  

    newtransportExpence.save()
        .then(mydata=>{
            res.status(200).json({status:true,msg:" Transport Expence Added Succssfully ! "});
        })
        .catch(err=>{
            res.status(400).json({status:true,msg:" Unable to Save the Database! "});
        });
});

//delete transportExpence
router.post('/onDelete',function(req,res){
    
    transportExpence.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:" Transport Expence  Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete transportExpence active
router.post('/onActive',function(req,res){
    
    transportExpence.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:" Transport Expence  Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});



//update
router.post('/onUpdate',function(req,res){

    transportExpence.find({
        ExpencesType:req.body.ExpencesType,
        vehical:req.body.vehical,
        date:req.body.date,
        cost:req.body.cost,
        description:req.body.description,
        comment:req.body.comment
    }).exec((err,docs)=>{
         if(docs.length){
             res.status(200).json({status:false,msg:"Transport Expence Already Added ! "});
             console.log(docs.length);      
        }
        else{
           console.log(req.body);
            transportExpence.findOneAndUpdate(
               
                {_id:req.body._id},
                { $set:
                    {
                        ExpencesType:req.body.ExpencesType,
                        vehical:req.body.vehical,
                        date:req.body.date,
                        cost:req.body.cost,
                        description:req.body.description,
                        comment:req.body.comment,
                        ModificationDate:Date.now()
                    }
                },
                {new:true})
            .then(my=>{
                res.status(200).json({status:true,msg:"Transport Expence Update Succssfully!"});
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