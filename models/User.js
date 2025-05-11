const mongoose = require('mongoose');
const {Schema} = mongoose; 
// const Schema = mongoose.Schema (can be written as both as both notations are same)

const userSchema = new Schema({
 googleId: String,
});

mongoose.model('users', userSchema); 