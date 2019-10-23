require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { carList, getCars, getOneCar, addCar, updateCar, deleteCar } = require('../models/users')

describe('User Manager', () => {
    
    it('will get all the cars', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()
    
        
    
        const res = {
          status: statusMock,
          json: jsonMock
        }
    
        getCars(reqMock, res, nextMock)
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, carList)
    })

    it('will get one car sucessfully', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = {
        params: { 
          id: 1, 
        }
      }
      const nextMock = sandbox.stub()
      const response = {
        id: 1,
        marca: 'honda', 
        motor: '2.0', 
        tiempo: '2012', 
        fuerza: '180', 
        tipo: 'deportivo'
      }
  
  
      const resMock = {
        status: statusMock,
        json: jsonMock
      }
  
      getOneCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 200)
      sinon.assert.calledWith(jsonMock, response)
    })

    it('won\'t get one car because ID dont exist', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const sendMock = sandbox.stub()
      const reqMock = {
        params: { 
          id: 4, 
        }
      }
      const nextMock = sandbox.stub()
     
  
      const resMock = {
        status: statusMock,
        json: sendMock
      }
  
      getOneCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 404)
      sinon.assert.called(sendMock)
    })


    it('will add one car sucessfully', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = {
        body: {
          marca: 'bmw', 
          motor: '3.0', 
          tiempo: '2012', 
          fuerza: '300', 
          tipo: 'deportivo'
        }
      }
      const nextMock = sandbox.stub()
      
      const response = {
        id: 3,
        marca: 'bmw', 
        motor: '3.0', 
        tiempo: '2012', 
        fuerza: '300', 
        tipo: 'deportivo'
      }

  
      const resMock = {
        status: statusMock,
        json: jsonMock
      }
  
      addCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 201)
      sinon.assert.calledWith(jsonMock, response)
      
    })

    it('dont add the car because body is invalid', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const sendMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = {
        body: {
          motor: '3.0', 
          tiempo: '2012', 
          fuerza: '300', 
          tipo: 'deportivo'
        }
      }
      const nextMock = sandbox.stub()
      const response = {
        message: '\"marca\" is required'
      }
  
      const resMock = {
        status: statusMock,
        json: jsonMock
      }
  
      addCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 400)
      sinon.assert.calledWith(jsonMock, response)
     
    })

    it('will update one car sucessfully', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const sendMock = sandbox.stub()
      const reqMock = {
        body: {
          marca: 'hyundai', 
          motor: '1600', 
          tiempo: '2013', 
          fuerza: '210', 
          tipo: 'deportivo'
        },
        params: {
          id: 1
        }
      }
      const nextMock = sandbox.stub()

      const resMock = {
        status: statusMock,
        send: sendMock
      }
  
      updateCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 204)
      sinon.assert.called(sendMock)
      
    })


    it('won\'t update one car because ID dont exist', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      
      const reqMock = {
        params: { 
          id: 4, 
        }
      }
      const nextMock = sandbox.stub()
      
      const response = {
        message: 'EL ID del carro no existe'
      }
  
      const resMock = {
        status: statusMock,
        json: jsonMock
      }
  
      updateCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 404)
      sinon.assert.calledWith(jsonMock, response)
    })


    it('dont update the car because body is invalid', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = {
        body: {
          
          motor: '1600', 
          tiempo: '2013', 
          fuerza: '210', 
          tipo: 'deportivo'
        },
        params: {
          id: 1
        }
      }
      const nextMock = sandbox.stub()

      const response = {
        message: '\"marca\" is required'
      }

      const resMock = {
        status: statusMock,
        json: jsonMock
      }
  
      updateCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 400)
      sinon.assert.calledWith(jsonMock, response)
      
    })


    it('will delete one car sucessfully', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const sendMock = sandbox.stub()
    
      const reqMock = {
        params: { 
          id: 1, 
        }
      }
      const nextMock = sandbox.stub()
     
  
  
      const resMock = {
        status: statusMock,
        send: sendMock
      }
  
      deleteCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 204)
      sinon.assert.called(sendMock)
    })

    it('dont delete one car because the id dont exist', () => {
      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
    
      const reqMock = {
        params: { 
          id: 4, 
        }
      }
      const nextMock = sandbox.stub()
     
      const response = {
        message: "EL ID del carro no existe"
      }
  
      const resMock = {
        status: statusMock,
        json: jsonMock
      }
  
      deleteCar(reqMock, resMock, nextMock)
      sinon.assert.calledWith(statusMock, 404)
      sinon.assert.calledWith(jsonMock, response)
    })

})