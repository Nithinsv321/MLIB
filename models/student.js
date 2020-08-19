const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    admNo:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    name:{
        type:String,
        required: true,
        trim: true,
    },
    gender:{
        type:String,
        required: true,
        trim: true,
    },
    batch:{
        start:{
            type:Number,
            required:true,
            trim:true
        },
        end:{
            type:Number,
            required:true,
            trim:true
        } 
    },
    takenBkId:[String]

});

const student = mongoose.model('Student',studentSchema);

module.exports =student;