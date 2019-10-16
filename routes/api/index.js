var express = require('express');
var router = express.Router();

//Rutas de Cada Entidad
var fotografiasApiRoutes = require('./fotografias/index');

//localhost:3000/api/fot/
router.use('/fot', fotografiasApiRoutes);

module.exports = router;