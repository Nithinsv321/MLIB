const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    start:{
        type:Number,
        required:true,
        trim:true,
    },
    end:{
        type:Number,
        required:true,
        trim:true,
    }
});


const batch = mongoose.model('Batch',batchSchema);
module.exports = batch;