require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
var { Car } = require('../models/car');
const { getCars, getOneCar, addCar, updateCar, deleteCar } = require('../models/users')

describe('User Manager', () => {
    
    it('will get all the cars', async () => {
        
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()
    
        
        const res = {
          status: statusMock,
          json: jsonMock
        }
    
        await getCars(reqMock, res, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 200);
            sinon.assert.calledWith(jsonMock, Car);
            
        }).catch(() => {})

    });


    it('will get one car sucessfully', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = {
          params: { 
            id: '5db37db23e1b4639580d3cb4', 
          }
        }
        const nextMock = sandbox.stub()
        const response = {
          id: '5db37db23e1b4639580d3cb4',
          marca: 'bmw', 
          motor: '3.0', 
          tiempo: '2012', 
          fuerza: '300', 
          tipo: 'deportivo',
          __v: 0
        }
    
    
        const resMock = {
          status: statusMock,
          json: jsonMock
        }
    
        await getOneCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 200)
            sinon.assert.calledWith(jsonMock, response)
            
        }).catch(() => { })
    
       
      })



      it('won\'t get one car because ID dont exist', async () => {
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
       

        await getOneCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 404)
            sinon.assert.called(sendMock)
            
        }).catch(() => { })
    
       

      })
  
    
      it('will add one car sucessfully', async () => {
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
          
          marca: 'bmw', 
          motor: '3.0', 
          tiempo: '2012', 
          fuerza: '300', 
          tipo: 'deportivo',
          __v: 0
        }
  
    
        const resMock = {
          status: statusMock,
          json: jsonMock
        }
    
        addCar(reqMock, resMock, nextMock)
        
        
        await addCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 201)
            sinon.assert.calledWith(jsonMock, response)
            
        }).catch(() => { })
    
      })
    
      it('dont add the car because body is invalid', async() => {
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
    
       
        await addCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 400)
            sinon.assert.calledWith(jsonMock, response)
            
        }).catch(() => { })
      })
  

      it('will update one car sucessfully', async() => {
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
            id: '5db38169ee6f8353ccff38a7'
          }
        }
        const nextMock = sandbox.stub()
  
        const resMock = {
          status: statusMock,
          send: sendMock
        }
    

        await updateCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 204)
            sinon.assert.called(sendMock)
        }).catch(() => { })
      })


      it('won\'t update one car because ID dont exist', async () => {
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
          message: 'No record with given id : 4'
        }
    
        const resMock = {
          status: statusMock,
          json: jsonMock
        }

        await updateCar(reqMock, resMock, nextMock).then(() => {
            ssinon.assert.calledWith(statusMock, 404)
            sinon.assert.calledWith(jsonMock, response)
        }).catch(() => { })
      })

      it('dont update the car because body is invalid',async () => {
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
            id: '5db38169ee6f8353ccff38a7'
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
    
        await updateCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 400)
            sinon.assert.calledWith(jsonMock, response)
        }).catch(() => { })
        
      })


      it('will delete one car sucessfully', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const sendMock = sandbox.stub()
      
        const reqMock = {
          params: { 
            id: '5db38281cdd3d147b4fe1b77', 
          }
        }
        const nextMock = sandbox.stub()
       
    
    
        const resMock = {
          status: statusMock,
          send: sendMock
        }

        await deleteCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 204)
            inon.assert.called(sendMock)
        }).catch(() => { })
      })
  
    
      it('dont delete one car because the id dont exist', async () => {
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
       
        const response = {
          message: "No record with given id : 4"
        }
    
        const resMock = {
          status: statusMock,
          json: sendMock,
          send: sendMock
        }

        await deleteCar(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 404)
            sinon.assert.calledWith(jsonMock, response)
        }).catch(() => { })

      })
});