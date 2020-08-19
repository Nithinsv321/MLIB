 const mongoose = require('mongoose');

 const questionSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    semester:{
        type:Number,
        required:true,
        trim:true
    },
 });

 const questions = new mongoose.model('Question',questionSchema);