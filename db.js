const mongoose = require('mongoose');

mongoose.connect('mongodb://10.0.75.1:27017/CrudDB', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;