var express= require('express');
var router = express.Router();

var fileModel = require('../filemodel');

var fotCollection = fileModel.getFotografias();

router.get('/', function(req, res){
  res.json({
    "entity":"Fotografias",
    "version":"0.0.1"
  });
}); //get

router.get('/all', function(req, res){
  fotCollection = fileModel.getFotografias();
  res.json(fotCollection);
}) //GET /ALL


router.post('/new', function(req, res){
    fotCollection = fileModel.getFotografias();
    var newFo = Object.assign(
       {},
       req.body,
       {
           "title, ": req.body.title,
           "url": req.body.url,
           "thumbnailUrl": req.body.thumbnailUrl,
           "album": req.body.album
       }
    );
    var foExists = fotCollection.find(
      function(o, i){
        return o.id === newFo.id;
      }
    )
    if( ! foExists ){
      fotCollection.push(newFo);
      fileModel.setFotografias(
         fotCollection,
         function(err, savedSuccesfully){
           if(err){
             res.status(400).json({ "error": "No se pudo ingresar objeto" });
           } else {
             res.json(newFo);  // req.body ===  $_POST[]
           }
         }
       );
    } else {
      res.status(400).json({"error":"No se pudo ingresar objeto"});
    }
  }); // post /new


  module.exports = router;