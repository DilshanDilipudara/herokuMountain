var express = require("express");
var router = express.Router();
var multer = require('multer');

var Shop = require('../models/shop.model')

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `FunOfHeuristic_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.post('/file', upload.array('files'), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send({sttus:  'ok'});
})

router.post('/add',(req,res)=>{
    let shop = new Shop(req.body);
    shop.save().then(shop=>{
        res.json({status:"200",msg:"Shop added succesfully!!"});
      }).catch(err=>{
        res.send(err);
      })
})

router.get('/all',(req,res)=>{
  Shop.find().then(shop=>{
    res.json({data:shop})
  }).catch(err=>{
    res.status(400).send(err);
  })
})

module.exports = router;
