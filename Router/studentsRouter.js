const express = require('express');
const router = new express.Router();
const Batch = require('../models/batch');
const Student = require('../models/student');
const {logauth,auth} = require('../controller/controller');
//get requests 
//batch
router.get('/AddBatch',logauth,async(req,res)=>{
    try {
        const batchs = await Batch.find({user:req.session.current});
        res.render('index',{page:'sub_menu/addBatch',batchs:batchs});
    } catch (error) {
        res.status(500).send()
    }
});

//Students
router.get('/Batch/:id',logauth,async(req,res)=>{
    const id = req.params.id;

    try {
        const batchs = await Batch.find({user:req.session.current});
        const selbatch = await Batch.findById({_id:id,user:req.session.current})
        const start = selbatch.start;
        const end = selbatch.end;
        const stds = await Student.find({batch:{start:start,end:end},user:req.session.current})
        res.render('index',{page:'sub_menu/viewStds',batchs:batchs,selbatch:selbatch,stds:stds});
    } catch (error) {
        console.log(error);
        req.status(500).send();
    }

});

//view all
router.get('/students',logauth,async(req,res)=>{
    try {
        const batchs = await Batch.find({user:req.session.current});
        res.render('index',{page:'sub_menu/viewStds',batchs:batchs});
    } catch (error) {
        res.status(408).send()
    }
});

//add student
router.get('/AddStudent',logauth,async(req,res)=>{
    try {
        const batchs = await Batch.find({user:req.session.current});
        res.render('index',{page:'sub_menu/addStd',batchs:batchs});
    } catch (error) {
        res.status(500).send()
    }
});
//edit student
router.get('/EditStudent/:id',logauth,async(req,res)=>{
    try {
        const id = req.params.id;
        const student = await Student.findById({_id:id,user:req.session.current});
        const batchs = await Batch.find({user:req.session.current});
        if(!student){
            return res.status(404).send();
        }
        res.render('index',{page:'sub_menu/editstd',student,batchs});
    } catch (error) {
        res.status(500).send();
    }

});




//post requests
//addBatch
router.post('/AddBatch',logauth,async(req,res)=>{
    try {
        const start = parseInt(req.body.start);
        const end = parseInt(req.body.end);
        let berrors =[]; 
        const batchs = await Batch.find({user:req.session.current});
        batchs.forEach(function(batch){
            if(batch.start == start && batch.end == end){
                berrors.push({msg: 'Batch already Exist'});
            }
        });
        
        if(berrors.length > 0){
            res.render('index',{page:'sub_menu/addBatch',berrors,batchs:batchs});
        }else{
            const addbatch = new Batch({
                user:req.session.current,
                start,
                end
            });
            await addbatch.save();
            res.redirect('/Student/AddBatch');
        }
    } catch (error) {
        res.status(500).send();
    }
});


//add Student
router.post('/AddStudent',logauth,async(req,res)=>{
    try {
        const {batch,admNo,gender} = req.body;
        const name = req.body.name.toUpperCase();
        let aberrors =[];
        let absuccess =[];
        const batchs = await Batch.find({user:req.session.current});
        const std = await Student.findOne({admNo:admNo,user:req.session.current});
        if(std){
            aberrors.push({msg:'Admission Number Already Exist'}); 
        }

       
        if(aberrors.length > 0){
            res.render('index',{page:'sub_menu/addStd',aberrors,batchs:batchs});
        }else {
            const stdBt = await Batch.findById({_id:batch,user:req.session.current})
            const start = stdBt.start;
            const end = stdBt.end;
            const addStd = new Student({
                user:req.session.current,
                admNo,
                name,
                batch:{
                    start,
                    end
                },
                gender
            });
            await addStd.save();
            absuccess.push({msg:'Student Added'})
            res.render('index',{page:'sub_menu/addStd',absuccess,batchs:batchs});
        }
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
});


//stds select
router.post('/students',logauth,async(req,res)=>{
    try {
        const batch = req.body.batch;
        const batchs = await Batch.find({user:req.session.current});
        const selbatch = await Batch.findById({_id:batch,user:req.session.current});
        const start = selbatch.start;
        const end = selbatch.end;
        const stds = await Student.find({batch:{start:start,end:end},user:req.session.current});
        let vserrors =[];
        if(stds.length == 0){
            vserrors.push({msg:'No Students added in this batch'});
           
        }
        if(vserrors.length >0){
            res.render('index',{page:'sub_menu/viewStds',batchs:batchs,vserrors})
        }else{
            res.render('index',{page:'sub_menu/viewStds',batchs:batchs,stds:stds,selbatch:selbatch})
            
        }
    } catch (error) {
        res.status(400).send();
    }
});

//std edit
router.post('/EditStudent/:id',logauth,async(req,res)=>{
    try {
        const {batch,admNo,gender} = req.body;
        const name = req.body.name.toUpperCase();
        let absuccess = [];
        const stdBt = await Batch.findById({_id:batch,user:req.session.current});
        if(!batch || !admNo || !gender || !name) return res.status(403).send();
        await Student.findByIdAndUpdate({
            _id: req.params.id,
            user:req.session.current
        },{
            $set:{
                admNo,
                name,
                batch:stdBt,
                gender
            }
        });
            absuccess.push({msg:'Student Updated'});
            res.render('index',{page:'sub_menu/editstd',absuccess});
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
})
 

module.exports = router;