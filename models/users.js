const Joi = require('joi');

let carList=[
    { id: 1, marca: 'honda', motor: '2.0', tiempo: '2012', fuerza: '180', tipo: 'deportivo'},
    { id: 2, marca: 'bmw', motor: '2.0', tiempo: '2015', fuerza: '240', tipo: 'camioneta'},
]


const getCars = (req, res, next) => {
    res.status(200)
    res.json(carList)
  }

  const getOneCar = (req, res, next) => {

    const car= carList.find(c => c.id === parseInt(req.params.id));

    if(!car){
        res.json({message: 'EL ID del carro no existe'});
        return res.status(404);
    } else {
        res.status(200)
        res.json(car);
    }
    

  }

  const addCar =(req, res, next) => {

    const { error } = validateCars(req.body);

    if(error) {
      res.json({ message: error.details[0].message})
      return res.status(400)
    }
  
    const ultimo=carList[carList.length-1].id
    const car={
      id: ultimo +1,
      marca: req.body.marca,
      motor: req.body.motor,
      tiempo: req.body.tiempo,
      fuerza: req.body.fuerza,
      tipo: req.body.tipo,
    };
  
    carList.push(car);
    res.status(201)
    res.json(car)
  }

  const updateCar = (req,res, next) => { 

    const car= carList.find(c => c.id === parseInt(req.params.id));
    if(!car) {
        res.json({message: 'EL ID del carro no existe'});
        return res.status(404)
    } 
    
    const { error } = validateCars(req.body);

    if(error) {
        res.json({ message: error.details[0].message});
        return res.status(400);
    }
    
    car.marca=req.body.marca;
    car.motor= req.body.motor;
    car.tiempo=req.body.tiempo;
    car.fuerza= req.body.fuerza;
    car.tipo= req.body.tipo;
    res.status(204)
    res.send();
    
  }

  const deleteCar = (req,res,next) => {

    const car= carList.find(c => c.id === parseInt(req.params.id));
    if(!car) {
        res.json({message: 'EL ID del carro no existe'});
        return res.status(404)

    }
    
    const index=carList.indexOf(car);
    carList.splice(index,1);
  
    res.status(204)
    res.send();
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
    carList,
    getCars,
    getOneCar,
    addCar,
    updateCar,
    deleteCar
    
  }