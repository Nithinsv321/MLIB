const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const {logauth,auth} = require('../controller/controller');
const Student = require('../models/student');
const Batch = require('../models/batch');
const Book = require('../models/books');
const Issued = require('../models/issued');
const student = require('../models/student');
 
//All get requests
router.get('/',(req,res)=>{
    try {
        res.render('search');
    } catch (error) {
        res.status(500).send();
    }
});
//login register
router.get('/Login',auth,(req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/Register',auth,(req,res)=>{
    try {
        res.render('register');
    } catch (error) {
        res.status(500).send();
    }
});

//home
router.get('/Home',logauth,async(req,res)=>{
    try {
        const books = await Book.find({user:req.session.current});
        const students =await Student.find({user:req.session.current});
        const returns = await Issued.find({user:req.session.current});
        let ret = [];
        returns.forEach(function(retur){
            if(!retur.returnDate){
                ret.push(retur);
            }
        });
        res.render('index',{page:'home',books:books.length,students:students.length,returns:ret.length});
    } catch (error) {
        res.status(500).send()
    }
});

//books router
router.get('/Books',logauth,async(req,res)=>{
    try {
        const books = await Book.find({user:req.session.current});
        res.render('index',{page:'books',books:books.length});
    } catch (error) {
        
    }
});
//resources router
router.get('/Resourses',logauth,(req,res)=>{
   
    try {
        res.render('index',{page:'resource'});
    } catch (error) {
        res.status(500).send()
    }
});
//students router
router.get('/Students',logauth,async(req,res)=>{
    
    try {
        const students = await Student.find({user:req.session.current});
        res.render('index',{page:'students',students:students.length});
    } catch (error) {
        res.status(500).send()
    }
});
//issue book router
router.get('/IssueBook',logauth,(req,res)=>{
    try {
      res.render('index',{page:'sub_menu/issuebk'});  
    } catch (error) {
        res.status(500).send();
    }
});
//book issued details 
router.get('/Returns',logauth,async(req,res)=>{
    try {
        const returns = await Issued.find({user:req.session.current});
        const batchs = await Batch.find({user:req.session.current})
        res.render('index',{page:'sub_menu/returns',returns,batchs});
    } catch (error) {
        res.status(500).send();
    }
});
//return menu
router.get('/Return',logauth,async(req,res)=>{
    try {
        const returns = await Issued.find({user:req.session.current});
        let ret =[];
        returns.forEach(function(retur){
            if(!retur.returnDate){
                ret.push({retur});
            }
        });
        res.render('index',{page:'return',ret:ret.length});
    } catch (error) {
        res.status(500).send();
    }
});
//return procedures
router.get('/Returnbook',logauth,async(req,res)=>{
    try {
        res.render('index',{page:'sub_menu/returnbook'});
    } catch (error) {
        res.status.send();
    }
});
//book history
router.get('/Bookhistory',logauth,async(req,res)=>{
    try {
        res.render('index',{page:'sub_menu/bookhistory'});
    } catch (error) {
        res.status(500).send();
    }
});
//profile
router.get('/Profile',logauth,async(req,res)=>{
    try {
        const user =await User.findById({_id:req.session.current});
        res.render('index',{page:'profile',user});
    } catch (error) {
        res.status(500).send();
    }
});




//all post requests 
//login register
router.post('/login',auth,async(req,res)=>{
    try {
        const {email,password} =req.body;
        const user = await User.findOne({email:email});
        logerrors =[];
        if(!email || ! password){
            logerrors.push({msg:'Please Fill all the fields'});
        }
        if(!user && email && password){
            logerrors.push({msg:'Incorrect Email or Password'});
        }else{
            const match = await bcrypt.compare(password,user.password);
            if(!match){
            logerrors.push({msg:'Incorrect Email or Password'});
            }
        }
        if(logerrors.length > 0){
            res.render('login',{logerrors})
        }else{
            req.session.current = user._id;
            res.redirect('/Home');
        }
    } catch (error) {
        res.status(404).send();
    }
});
router.post('/Register',auth,async(req,res)=>{
    try {
        const {name,email,password,confirmPassword} = req.body;
        const user = await User.find({email:email});
        regerrors = [];
        if(!email || ! password || !confirmPassword || ! name){
            regerrors.push({msg:'Please Fill all the fields'});
        }
        if((password.length < 6) && email && name){
            regerrors.push({msg:'Password Should not be less than 6'});
        }
        if((password != confirmPassword) && email && name){
            regerrors.push({msg:'Password Does not match'});
        }
        if(user.length > 0){
            regerrors.push({msg: 'User already Exist'});
        }

        if(regerrors.length >0){
            res.render('register',{regerrors});
        }else{
            
            const regUser = new User({
                name,
                email,
                password
            });
            await regUser.save();
            res.redirect('/Login');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
//destroy session
router.get('/Logout',logauth,(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/Home');
        }
        res.clearCookie(process.env.SESSION_NAME);
        res.redirect('/');
    })
});



/// book search routers
router.post('/search',logauth,async(req,res)=>{
    try {
        const books = await Book.find({user:req.session.current});
        const searchBK = req.body.searchBK.toLowerCase();
        let sBK=[];
        books.forEach(function(book){
            let title = book.title.toLowerCase();
            if( title.includes(searchBK)){
               sBK.push(book);
            }
        });
        let searerrors =[];
        if(sBK.length == 0){
            searerrors.push({msg:'No Book '});
        }
        if(searerrors.length > 0){
            res.send( { searerrors:searerrors });
        }else{
            res.send( { sBK:sBK });
        }
    } catch (error) {
        console.log(error);
        res.status(404).send();
        
    }
});


//all book issue router
router.post('/IssueBook',logauth,async(req,res)=>{
    try {
        const issbkid = req.body.issueID;
        const issStdId= req.body.issueStdID;
        const book = await Book.findOne({bookId:issbkid,user:req.session.current});
        const student = await Student.findOne({admNo:issStdId,user:req.session.current});
        let iss_errors =[];
        if(!book){
            iss_errors.push({msg:'Book Not Found'});
        }
        if(!student){
            iss_errors.push({msg:'Student Not found'});
        }

        if(book && book.stdAdId ){
            iss_errors.push({msg:'Please return the book before issue'});
        }
        if(iss_errors.length > 0){
            res.render('index',{page:'sub_menu/issuebk',iss_errors})
        }else{
            res.render('index',{page:'sub_menu/issuebk',isssBK:book,issStd:student})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.post('/Issued',logauth,async(req,res)=>{
    try {
        const {issstdId,issbkId} =req.body;
        const time = new Date();
        const issueDate =`${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()} (${time.getHours()}:${time.getMinutes()})`;
        const book = await Book.findOne({bookId:issbkId,user:req.session.current});
        const student =await Student.findOne({admNo:issstdId,user:req.session.current});
        if(book.stdAdId){
            return res.status(403).send();
        }
        if(!book){
            return res.status(500).send();
        }
        const issuedTo = new Issued({
            user:req.session.current,
            bookID:issbkId,
            stdID:issstdId,
            issueDate:issueDate,
            batch:{
                start: student.batch.start,
                end: student.batch.end
            }
        });
        
        await issuedTo.save();
        await Book.findOneAndUpdate(
            {
                bookId:issbkId,
                user:req.session.current
            },{
                $set:{
                    stdAdId: issstdId,
                    issueDate:issueDate
                }
            });
        await Student.findOneAndUpdate(
            {
                admNo:issstdId,
                user:req.session.current
            },
            {
                $push:{
                    takenBkId:issbkId
                }
            });
        res.render('index',{page:'sub_menu/issuebk',issmsg:'Book Issued'});
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
    

    
});

//return search
router.post('/BatchReturn',logauth, async(req,res)=>{
    try {
        const batchReturn = req.body.batch; 
        const selbatch = await Batch.findById({_id:batchReturn,user:req.session.current});
        const start = selbatch.start;
        const end = selbatch.end;
        const stds = await Student.find({batch:{start:start,end:end},user:req.session.current});
        const returns = await Issued.find({user:req.session.current});
        const batchs = await Batch.find({user:req.session.current});
        if(!stds){
           return res.render('index',{page:'sub_menu/returns',issretmsg:'Please select a batch',returns,batchs});
        }
        res.render('index',{page:'sub_menu/returns',stds,selbatch,batchs});
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
});

//return fetch
router.post('/Returns',logauth,async(req,res)=>{
    try {
        const issId = req.body.retBkId;
        const issretiss = await Issued.findOne({bookID:issId,returnDate:'',user:req.session.current});
        if(!issretiss){
            return  res.render('index',{page:'sub_menu/returnbook',retisserror:'Please enter a valid Book Id'});
        }
        const issretBK = await Book.findOne({bookId:issId,stdAdId:issretiss.stdID,user:req.session.current});
        const issretStd = await Student.findOne({admNo:issretiss.stdID,user:req.session.current});
        res.render('index',{page:'sub_menu/returnbook',issretBK:issretBK,issretStd:issretStd,issretiss:issretiss});

    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
});

//return book 
router.post('/Returned',logauth,async(req,res)=>{
    try {
        const firetId = req.body.firetId;
        const time = new Date();
        const firetDate =`${time.getDate()}-${time.getMonth()+1}-${time.getFullYear()} (${time.getHours()}:${time.getMinutes()})`;
        const issued = await Issued.findOne({_id:firetId,user:req.session.current});
        if(!firetId ){
            return res.status(403).send();
        }
        await Issued.updateOne({
            _id:issued._id,
            user:req.session.current
        },{
            $set:{
                returnDate:firetDate
            }
        });
        await Book.updateOne({
            bookId:issued.bookID,
            user:req.session.current
        },{
            $set:{
                stdAdId:'',
                issueDate:''
            }
        });
        await Student.updateOne({
            admNo:issued.stdID,
            user:req.session.current
        },{
            $pull:{
                takenBkId:issued.bookID
            }
        });
        res.render('index',{page:'sub_menu/returnbook',retisssucess:'Book Returned'});
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
});

//book history
router.post('/Bookhistory',logauth,async(req,res)=>{
    try {
        const histbookId = req.body.hisBkId;
        const bkhists = await Issued.find({bookID:histbookId,user:req.session.current});
        if(!bkhists){
            return res.render('index',{page:'sub_menu/bookhistory',bkhistmsg:'No History'});
        }
        res.render('index',{page:'sub_menu/bookhistory',bkhists});
    } catch (error) {
        res.status(500).send();
    }
});


//profile update
router.post('/Profile',logauth,async(req,res)=>{
    try {
        const user =await User.findById({_id:req.session.current});
        const updates = Object.keys(req.body);
        const {name,email,password,updatePassword,updateConfirmPassword}= req.body;
         const upuser =await User.findOne({email:email});
        if(upuser){
            const match = await bcrypt.compare(password,user.password);
            if(!match) {
                return res.render('index',{page:'profile',user,updateerror:'Password Incorrect'});
            }
            updates.forEach((update)=> {
                if(upuser[update]){
                    if(update == 'password'){
                        upuser[update] = req.body['updatePassword']
                    }else{
                        upuser[update]= req.body[update];
                    }
                    
                }
            }); 
            upuser.save().then((updated)=> res.redirect('/Logout')).catch((error)=> res.render('index',{page:'profile',user,updateerror:'Password Incorrect'}));
        }
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
});


//searchpublic
router.post('/',async(req,res)=>{
    try{
        const search = req.body.search.toLowerCase();
        if(!search){
            return res.redirect('/');
        }
        const books = await Book.find({});
        let sBK=[];
        books.forEach(function(book){
            let title = book.title.toLowerCase();
            if( title.includes(search)){
               sBK.push(book);
            }
        });
        if(sBK.length == 0){
            return res.render('search',{msg:'No Book'});
        }
        res.render('search',{sBK:sBK});
    }catch(error){
        res.status(500).send();
    }
});
 

 
module.exports = router;