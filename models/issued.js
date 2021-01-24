const mongoose = require('mongoose');
 

const issueSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    bookID :{
        type:String,
        required:true,
        trim:true
    },
    stdID:{
        type:String,
        required:true,
        trim:true,
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
    issueDate:{
        type: String,
        trim:true,
        required:true,
    },
    returnDate:{
        type: String,
        trim:true,
        default:''
    },
});

const issued = mongoose.model('Issued',issueSchema);

module.exports = issued