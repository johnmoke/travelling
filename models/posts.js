let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
   id: String,       //This id will be used for other purspose (update,delete,edit a post)
   title: String,
   date: Date,
   description: String,
   text: String,
   country: String,
   imageURL: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = { Post }