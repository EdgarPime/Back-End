const mongoose = require('mongoose');

var Car = mongoose.model('Car', {
    marca: { type: String },
    motor: { type: String },
    tiempo: { type: String },
    fuerza: { type: String },
    tipo: { type: String }
});

module.exports = { Car };