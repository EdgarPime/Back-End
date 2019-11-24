const config = require('config');
const MongoConfig= config.get('Customer.dbConfig');
const mongoose = require('mongoose');

mongoose.connect('mongodb://'+MongoConfig.host+':'+MongoConfig.port+'/'+ MongoConfig.dbName, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;

//10.0.75.1