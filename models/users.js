const Joi = require('joi');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const { Car } = require('../models/car');


const getCars = async (req,res ,next) => {
    Car.find((err, docs) => {
        if (!err) {  
          res.status(200).json(docs);
           
        }
        // else { return console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2)); }
      });
      //res.send(cars);
}

const getOneCar = async (req, res, next) => {
    
  if (!ObjectId.isValid(req.params.id)){
    
    return res.status(404).json({ message: `No record with given id : ${req.params.id}` });
  }
  

  Car.findById(req.params.id, (err, doc) => {
      if (!err) { 
          res.status(200).send(doc); 
          
          
        }
    //   else { 
    //       console.log('Error in Retriving Car :' + JSON.stringify(err, undefined, 2)); 
    //     }
  });
}

const addCar = async (req,res, next) => {
    const { error } = validateCars(req.body);

  if(error) {
    return res.status(400).json({ message: error.details[0].message})
  }

  var car= new Car({
    
    marca: req.body.marca,
    motor: req.body.motor,
    tiempo: req.body.tiempo,
    fuerza: req.body.fuerza,
    tipo: req.body.tipo,
  });

  car.save((err, doc) =>{
    if (!err) { 
      res.status(201).send(doc);
      
      
    }
    // else { console.log('Error in Car Save :' + JSON.stringify(err, undefined, 2)); }
  });

}

const updateCar = async (req, res, next) => {
    
    if (!ObjectId.isValid(req.params.id))
    {
      return res.status(404).json({ message: `No record with given id : ${req.params.id}` });
      
    }

    const { error } = validateCars(req.body);

    if(error) {
      return res.status(400).json({ message: error.details[0].message})
    }
 
    var car = {
    marca: req.body.marca,
    motor: req.body.motor,
    tiempo: req.body.tiempo,
    fuerza: req.body.fuerza,
    tipo: req.body.tipo,
    };

    Car.findByIdAndUpdate(req.params.id, { $set: car }, { new: true }, (err, doc) => {
    if (!err) {
      res.status(204).send(doc); 
      }
    // else { console.log('Error in Car Update :' + JSON.stringify(err, undefined, 2)); }
    });


}

const deleteCar = async (req, res ,next) => {

    if (!ObjectId.isValid(req.params.id)){
      
      return res.status(404).send(`No record with given id : ${req.params.id}` );
      
        
    }
     

    
    Car.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
          res.status(204).send()
        }
        // else { console.log('Error in Car Delete :' + JSON.stringify(err, undefined, 2)); }
    });

}

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
  

module.exports = {
    getCars,
    getOneCar,
    addCar,
    updateCar,
    deleteCar
    
  }