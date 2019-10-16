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
           "title": req.body.title,
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



  router.put('/update/:foId',
  function(req, res){
      fotCollection = fileModel.getFotografias();
      var foIdToModify = req.params.foId;
      var amountToAdjust = parseInt(req.body.ajustar);
      var adjustType = req.body.tipo || 'SUB';
      var adjustHow = (adjustType == 'ADD' ? 1 : -1);
      var modFotografias = {};
      var newFotografiasArray = fotCollection.map(
        function(o,i){
          if( foIdToModify === o.id){
             o.title = adjustType;
             modFotografias = Object.assign({}, o);
          }
          return o;
        }
      ); // end map
    fotCollection = newFotografiasArray;
    fileModel.setFotografias(
      fotCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo actualizar objeto" });
        } else {
          res.json(modFotografias);  // req.body ===  $_POST[]
        }
      }
    );
  }
);// put :prdsku


router.delete(
    '/delete/:fotId',
    function( req, res) {
      fotCollection = fileModel.getFotografias();
      var fotIdToDelete  = req.params.fotId;
      var newFotCollection = fotCollection.filter(
        function(o, i){
          return fotIdToDelete !== o.id;
        }
      ); //filter
      fotCollection = newFotCollection;
      fileModel.setFotografias(
        fotCollection,
        function (err, savedSuccesfully) {
          if (err) {
            res.status(400).json({ "error": "No se pudo eliminar objeto" });
          } else {
            res.json({"newProdsQty":fotCollection.length});
          }
        }
      );
    }
  );// delete
  


  module.exports = router;