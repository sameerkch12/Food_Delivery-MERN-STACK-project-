const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        requied: true
    },
    location:{
        type: String,
        requied: true
    },
    email:{
        type: String,
        requied: true
    },
    password:{
        type: String,
        requied: true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user',UserSchema)