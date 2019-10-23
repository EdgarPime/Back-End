var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

function ArregloCarros(){
  const cars=[
    { id: 1, marca: 'honda', motor: '2.0', tiempo: '2012', fuerza: '180', tipo: 'deportivo'},
    { id: 2, marca: 'bmw', motor: '2.0', tiempo: '2015', fuerza: '240', tipo: 'camioneta'},
  ];
}