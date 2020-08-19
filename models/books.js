const mongoose = require('mongoose');
 

const bookSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    bookId:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    isbn:{
        type: Number,
        required: true,
        trim: true
    },
    title:{
        type:String,
        required: true,
        trim: true,
    },
    author:{
        type:String,
        required: true,
        trim: true,
    },
    edition:{
        type:String,
        required: true,
        trim: true,
    },
    status:{
        type:String,
        required: true,
        trim: true,
    },
    issueDate:{
        type:String,
        trim:true,
        default:''
    },
    stdAdId:{
        type:String,
        trim:true,
        default:''
    },
   
});

const book = mongoose.model('Books',bookSchema);

module.exports =book;