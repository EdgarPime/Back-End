const Joi = require('joi');
var express = require('express');
var router = express.Router();
const { getCars, getOneCar, addCar, updateCar, deleteCar } = require('../models/users')

const cars=[
  { id: 1, marca: 'honda', motor: '2.0', tiempo: '2012', fuerza: '180', tipo: 'deportivo'},
  { id: 2, marca: 'bmw', motor: '2.0', tiempo: '2015', fuerza: '240', tipo: 'camioneta'},
];


router.get('/v1/cars', getCars);
router.get('/v1/cars/:id', getOneCar);
router.post('/v1/cars/', addCar);
router.put('/v1/cars/:id', updateCar);
router.delete('/v1/cars/:id', deleteCar) 

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
