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



  module.exports = router;