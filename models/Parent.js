const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = Parent = mongoose.model('Parent',ParentSchema);