const Joi = require('joi');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Car } = require('../models/car');

const cars=[
  { id: 1, marca: 'honda', motor: '2.0', tiempo: '2012', fuerza: '180', tipo: 'deportivo'},
  { id: 2, marca: 'bmw', motor: '2.0', tiempo: '2015', fuerza: '240', tipo: 'camioneta'},
];

/* GET cars listing. */
router.get('/v1/cars', function(req, res, next) {
  
  Car.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2)); }
  });
  //res.send(cars);
});

router.get('/v1/cars/:id', function(req, res, next) {
  
  // const car= cars.find(c => c.id === parseInt(req.params.id));
  // if(!car) return res.status(404).json({message: 'EL ID del carro no existe'});
  //res.send(car);

  if (!ObjectId.isValid(req.params.id))
  return res.status(404).send(`No record with given id : ${req.params.id}`);

  Car.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/v1/cars', function(req, res, next) {
  const { error } = validateCars(req.body);

  if(error) {
    return res.status(400).json({ message: error.details[0].message})
  }

  //const ultimo=cars[cars.length-1].id
  var car= new Car({
    //id: ultimo +1,
    marca: req.body.marca,
    motor: req.body.motor,
    tiempo: req.body.tiempo,
    fuerza: req.body.fuerza,
    tipo: req.body.tipo,
  });

  car.save((err, doc) =>{
    if (!err) { res.send(doc).status(201); }
    else { console.log('Error in Car Save :' + JSON.stringify(err, undefined, 2)); }
  });
  //cars.push(car);
  //res.status(201).send(car)
});

router.put('/v1/cars/:id', function(req, res, next) {


  if (!ObjectId.isValid(req.params.id))
  return res.status(404).send(`No record with given id : ${req.params.id}`);
  
  const { error } = validateCars(req.body);

  if(error) {
    return res.status(400).json({ message: error.details[0].message})
  }
  
  // car.marca=req.body.marca;
  // car.motor= req.body.motor;
  // car.tiempo=req.body.tiempo;
  // car.fuerza= req.body.fuerza;
  // car.tipo= req.body.tipo;
  // res.status(204).send(car);


var car = {
  marca: req.body.marca,
  motor: req.body.motor,
  tiempo: req.body.tiempo,
  fuerza: req.body.fuerza,
  tipo: req.body.tipo,
};
Car.findByIdAndUpdate(req.params.id, { $set: car }, { new: true }, (err, doc) => {
  if (!err) { res.send(doc).status(204); }
  else { console.log('Error in Car Update :' + JSON.stringify(err, undefined, 2)); }
});


});

router.delete('/v1/cars/:id', function(req, res, next) {
  
  // const car= cars.find(c => c.id === parseInt(req.params.id));
  // if(!car) return res.status(404).json({message: 'EL ID del carro no existe'});
  
  // const index=cars.indexOf(car);
  // cars.splice(index,1);

  // res.status(204).send();

  if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id : ${req.params.id}`);

    Car.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc).status(204); }
        else { console.log('Error in Car Delete :' + JSON.stringify(err, undefined, 2)); }
    });

});

function validateCars(car){
  const schema={
    marca:Joi.string().max(30).required(),
    motor:Joi.string().max(5).required(),
    tiempo:Joi.number().min(1900).max(2020).required(),
    fuerza:Joi.number().required().max(10000),
    tipo:Joi.string().max(30).required()
  };

  return Joi.validate(car, schema);
}

module.exports = router;
