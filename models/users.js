const Joi = require('joi');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var config= require('config');

var redis = require('redis');
// var client = redis.createClient(config.redisConf);
var client = redis.createClient(config.get('Customer.redis'));

// const dbConfig = config.get('Customer.redis');


var comprobar=false;
client.on('connect', function() {
  comprobar=true;
  console.log('connected Redis');
});

client.on('error', function() {
  comprobar=false;
  console.log('No conecto con Redis');
});

var KeyCars = "getCars";

const { Car } = require('../models/car');


const getCars = async (req,res ,next) => {
  if(comprobar){
    client.exists(KeyCars, function(err, reply) {
      if (reply === 1) {

          console.log('exists');

          client.get(KeyCars, function(error,respuesta){

            res.status(200).json(JSON.parse(respuesta));

          })

      } else {
          console.log('doesn\'t exist');
          
          Car.find((err, docs) => {
            if (!err) {  
              client.set(KeyCars,JSON.stringify(docs))
              console.log(KeyCars);
              client.expire(KeyCars,20);
              res.status(200).json(docs);
               
            } else {

              res.status(500).send('Error en el servidor');

            }
            
          });

      }
    }); 
  } else {
    Car.find((err, docs) => {
      if (!err) {  

        res.status(200).json(docs);
         
      } else {

        res.status(500).send('Error en el servidor');

      }
      
    });
  }

}

const getOneCar = async (req, res, next) => {
 
  var KeyCar = "getOneCar" + req.params.id;

  if (!ObjectId.isValid(req.params.id)){
    
    return res.status(404).json({ message: `No record with given id : ${req.params.id}` });
  }
  
  if(comprobar){
    client.exists(KeyCar, function(err, reply) {
      if (reply === 1) {
  
          console.log('exists');
  
          client.get(KeyCar, function(error,respuesta){
  
            res.status(200).json(JSON.parse(respuesta));
  
          })
  
      } else {
          console.log('doesn\'t exist');
  
          Car.findById(req.params.id, (err, doc) => {
            if (!err) { 
                client.set(KeyCar,JSON.stringify(doc))
                client.expire(KeyCar,20);
                res.status(200).send(doc); 
                
                
              }else {
  
                res.status(500)//.send('Error en el servidor');
          
              }
        });
  
  
      }
    }); 
  } else {
    Car.findById(req.params.id, (err, doc) => {
      if (!err) { 
          
          res.status(200).send(doc); 
          
        }else {

          res.status(500)//.send('Error en el servidor');

        }
  });
  }
   

  
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
      
      
    }else {

      res.status(500).send('Error en el servidor');

    }
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

    }else {

      res.status(500).send('Error en el servidor');

    }
    
    });
  

}

const deleteCar = async (req, res ,next) => {

    if (!ObjectId.isValid(req.params.id)){
      
      return res.status(404).send(`No record with given id : ${req.params.id}` );
    
    }
     

    
    Car.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 

          res.status(204);
          res.send();

        }else {

          res.status(500)//.send('Error en el servidor');

        }
        
    });

}

function validateCars(car){
    const schema={
      _id:Joi.not(),
      marca:Joi.string().max(30).required(),
      motor:Joi.string().max(5).required(),
      tiempo:Joi.number().min(1900).max(2020).required(),
      fuerza:Joi.number().required().max(10000),
      tipo:Joi.string().max(30).required(),
      __v:Joi.number()
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