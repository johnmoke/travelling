let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String,
    date: Date
});

let Email = mongoose.model('Email', emailSchema, 'emails'); // create a class

module.exports = { Email };


 

