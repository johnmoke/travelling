let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
   //This id will be used for other purspose (update,delete,edit a post)
   email: String,
   password: String,
   description: String
});

let User = mongoose.model('User', usersSchema, 'users');

module.exports = { User }