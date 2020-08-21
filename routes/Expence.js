const express = require('express');
const router = express.Router();

const Expence = require('../models/Expence.model');

router.get('/view',(req,res)=>{
    Expence.find()
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load Expence 
router.get('/load',(req,res)=>{
    Expence.find({IsDeleted:false,ExpiryDate:null})
     .then( mydata =>{
         res.status(200).json({data:mydata})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add Expence
router.post('/add',function(req,res){

    Expence.find({ExpencesType:req.body.ExpencesType,date:req.body.data,
        cost:req.body.cost,description:req.body.description,comment:req.body.comment}).exec((err,docs)=>{
        if(docs.length){
             res.status(200).json({status:false,msg:" Expence Already Added ! "});
             console.log(docs.length);      
        }
        else{
                var newExpence = new Expence(req.body);  

                newExpence.save()
                    .then(mydata=>{
                        res.status(200).json({status:true,msg:" Expence Added Succssfully ! "});
                    })
                    .catch(err=>{
                        res.status(400).json({status:true,msg:" Unable to Save the Database! "});
                    });
         }
    });
});

//delete Expence
router.post('/onDelete',function(req,res){
    
    Expence.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:"Expence Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete Expence active
router.post('/onActive',function(req,res){
    
    Expence.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(mydata=>{
            res.status(200).json({status:true,msg:"Expence Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});



//update
router.post('/onUpdate',function(req,res){

    Expence.find({
        ExpencesType:req.body.ExpencesType,
        date:req.body.date,
        cost:req.body.cost,
        description:req.body.selling,
        comment:req.body.comment
    }).exec((err,docs)=>{
         if(docs.length){
             res.status(200).json({status:false,msg:" Expence Already Added ! "});
             console.log(docs.length);      
        }
        else{
            console.log(req.body)
            Expence.findOneAndUpdate(
               
                {_id:req.body._id},
                { $set:
                    {
                        ExpencesType:req.body.ExpencesType,
                        date:req.body.date,
                        cost:req.body.cost,
                        description:req.body.selling,
                        comment:req.body.comment,
                        ModificationDate:Date.now()
                    }
                },
                {new:true})
            .then(my=>{
                res.status(200).json({status:true,msg:"Expence Update Succssfully!"});
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