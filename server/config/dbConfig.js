const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;


// Verify Connection
connection.on('connected', () => {
    console.log('Mongo DB Connection Successfull');
})

// Verify connection error
connection.on('error', (err) => {
    console.log('Mongo DB Connection Error', err);
})
