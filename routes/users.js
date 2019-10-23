const Joi = require('joi');
var express = require('express');
var router = express.Router();

const cars=[
  { id: 1, marca: 'honda', motor: '2.0', tiempo: '2012', fuerza: '180', tipo: 'deportivo'},
  { id: 2, marca: 'bmw', motor: '2.0', tiempo: '2015', fuerza: '240', tipo: 'camioneta'},
];

/* GET cars listing. */
router.get('/v1/cars', function(req, res, next) {
  
  res.send(cars);
});

router.get('/v1/cars/:id', function(req, res, next) {
  
  const car= cars.find(c => c.id === parseInt(req.params.id));
  if(!car) return res.status(404).json({message: 'EL ID del carro no existe'});
  res.send(car);
});

router.post('/v1/cars', function(req, res, next) {
  const { error } = validateCars(req.body);

  if(error) {
    return res.status(400).json({ message: error.details[0].message})
  }

  const ultimo=cars[cars.length-1].id
  const car={
    id: ultimo +1,
    marca: req.body.marca,
    motor: req.body.motor,
    tiempo: req.body.tiempo,
    fuerza: req.body.fuerza,
    tipo: req.body.tipo,
  };

  cars.push(car);
  res.status(201).send(car)
});

router.put('/v1/cars/:id', function(req, res, next) {


  const car= cars.find(c => c.id === parseInt(req.params.id));
  if(!car) return res.status(404).json({message: 'EL ID del carro no existe'});
  
  const { error } = validateCars(req.body);

  if(error) {
    return res.status(400).json({ message: error.details[0].message})
  }
  
  car.marca=req.body.marca;
  car.motor= req.body.motor;
  car.tiempo=req.body.tiempo;
  car.fuerza= req.body.fuerza;
  car.tipo= req.body.tipo;
  res.status(204).send();
  
});

router.delete('/v1/cars/:id', function(req, res, next) {
  
  const car= cars.find(c => c.id === parseInt(req.params.id));
  if(!car) return res.status(404).json({message: 'EL ID del carro no existe'});
  
  const index=cars.indexOf(car);
  cars.splice(index,1);

  res.status(204).send();
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
