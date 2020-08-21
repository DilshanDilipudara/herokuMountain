var express = require('express');
var jwt    = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();

var User = require('../models/user.model')
var config = require('../config')

router.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. Invalid user username.' });
    } else if (user) {
      // check if password matches
      bcrypt.compare(req.body.password, user.password,(err,validity)=>{
        if (!validity) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
          // if user is found and password is right
          // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        username:user.username,
        role:user.role,
        status:user.status,
        id:user._id
      };
          var token = jwt.sign(payload, config.secret, {
           expiresIn: 1440 // expires in 24 hours
          });
  
          // return the information including token as JSON
          res.json({
            data:payload,
            token: token
          });
        }
      })
    }

  });
});

router.post('/register',(req,res)=>{
  let user = new User(req.body);
  bcrypt.hash(req.body.password, 12).then(function(hashedPassword) {
    user.password=hashedPassword;
    user.save().then(user=>{
      res.json({status:"200",msg:"User added succesfully!!"});
    }).catch(err=>{
      res.send(err);
    })
  })
})

router.get('/',(req,res)=>{
  console.log("true");
  User.find().then(user=>{
    res.json(user)
  }).catch(err=>{
    res.status(400).send(err)
  })
})

//view user 
router.get('/view',(req,res)=>{
  User.find()
  .then( user => {
      res.status(200).json({data:user})
  })
  .catch(err=>{
      res.status(400).send(err);
  })
});


//delete
router.post('/onDelete',(req,res)=>{
    
  User.findOneAndUpdate(
      {_id:req.body._id},
      { $set:{IsDeleted:true,ExpiryDate:new Date()}},
      {new:true})
  .then(myuser=>{
      res.status(200).json({status:true,msg:"User Delete Succssfully!"});
  })
  .catch(err=>{
      res.status(400).send(err);
      console.log(err);
  });
});


//Delete  active
router.post('/onActive',function(req,res){
  
  User.findOneAndUpdate(
          {_id:req.body._id},
          { $set:{IsDeleted:false,ExpiryDate:null}},
          {new:true})
      .then(myuser=>{
          res.status(200).json({status:true,msg:"User Active Succssfully!"});
          console.log("true");
      })
      .catch(err=>{
          res.status(400).send(err);
          console.log(err);
      });
});



//Accept
router.post('/onAccept',(req,res)=>{
    
  User.findOneAndUpdate(
      {_id:req.body._id},
      { $set:{status:"active"}},
      {new:true})
  .then(myuser=>{
      res.status(200).json({status:true,msg:"User Accepted  Succssfully!"});
  })
  .catch(err=>{
      res.status(400).send(err);
      console.log(err);
  });
});


//Delete  active
router.post('/onNonAccept',function(req,res){
  
  User.findOneAndUpdate(
          {_id:req.body._id},
          { $set:{status:"Inactive"}},
          {new:true})
      .then(myuser=>{
          res.status(200).json({status:true,msg:"User Non Accepted !"});
          console.log("true");
      })
      .catch(err=>{
          res.status(400).send(err);
          console.log(err);
      });
});

module.exports = router;
