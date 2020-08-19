const express = require('express');
const router = new express.Router();
const Book = require('../models/books');
const {logauth,auth} = require('../controller/controller');
const book = require('../models/books');
//all get requests
router.get('/ViewBooks',logauth, async(req,res)=>{
    try {
        const books = await Book.find({user:req.session.current});
        //  books.forEach(function(book){
        //      console.log( book.stdAdId)
        //  })
        res.render('index',{page:'sub_menu/viewBooks',books:books})
    } catch (error) {
        return res.status(500);
    }
});

router.get('/AddBook',logauth, (req,res)=>{
    res.render('index',{page:'sub_menu/addBook'})
});

//Edit Book 
router.get('/Edit/:id',logauth,async(req,res)=>{
    const _id = req.params.id;
    try {
        const book = await Book.findById({_id:_id,user:req.session.current});
        res.status(200).render('index',{page:'sub_menu/editBook',book:book})
    } catch (error) {
        res.status(500).render('index',{page:'sub_menu/viewBooks'})
    }
});


//All post requests
router.post('/AddBook',logauth,async(req,res)=>{
    try{
        const {bookId,isbn,title,author,edition,status} = req.body; 
        let errors =[];
        let sucess =[];
        const book = await Book.findOne({bookId:bookId,user:req.session.current});
        if(book){
            errors.push({msg:'Book Id Alredy Exist'});
        }
        if(errors.length > 0){
            res.render('index',{page:'sub_menu/AddBook',errors});
        }
        else{
            const newBook = new Book({
                user:req.session.current,
                bookId,
                isbn,
                title,
                author,
                edition,
                status,
            });
            
            await newBook.save();
            sucess.push({msg:'Book Added'});
            res.render('index',{page:'sub_menu/AddBook',sucess});
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send();
    }
 });


router.post('/EditBook/:id',logauth,async(req,res)=>{
    try{
        const _id = req.params.id;
        const {bookId, isbn ,title,author,edition } = req.body;
        const updates = Object.keys(req.body);
        let edbSuccess = [];
        let edbErrors =[];
        const book = await Book.findById({_id:_id,user:req.session.current});
        if(!bookId  || !isbn || !title || !edition || !author ){
            edbErrors.push({msg:'Please Fill All the Flieds'});
            
        }
        if(!parseInt(isbn)){
            edbErrors.push({msg: 'Please enter a valid ISBN'});
        }
        if(edbErrors.length >0){
            res.render('index',{page:'sub_menu/EditBook',edbErrors,book:book});
        }else{
            updates.forEach((update)=> book[update]= req.body[update]);
        
            await book.save();
            edbSuccess.push({msg:'Book Updated'});
            res.render('index',{page:'sub_menu/AddBook',edbSuccess});
        }
    } catch (e) {
        console.log(e)
        res.status(500).send();
    }
});

 module.exports = router
