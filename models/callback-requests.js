let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
});

let callbackRequest = mongoose.model('callbackRequest', callbackRequestSchema, 'callback-requests'); // create a class

module.exports = { callbackRequest };

// Next we will create route for getting , adding and deleting requests from the database
// That will be done in the routes folder from the main folder application
 

