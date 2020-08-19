// const express = require('express');
// const router = new express.Router();
// const session = require('express-session');
// const {logauth,auth} = require('../controller/controller');

// router.get('/Questions',logauth,(req,res)=>{
//     try {
//         res.render('index',{page:'sub_menu/semesters'});
//     } catch (error) {
//         res.status(500).send();
//     }
// });

// //select semester
// router.get('/Questions/1',logauth,async(req,res)=>{
//     try {
//         res.render('index',{page:'sub_menu/questions/qns'});
//     } catch (error) {
//         res.status(500).send(); 
//     }
// });
// router.get('/Questions/2',logauth,async(req,res)=>{
//     try {
//         res.render('index',{page:'sub_menu/questions/qns'});
//     } catch (error) {
//         res.status(500).send(); 
//     }
// });
// router.get('/Questions/3',logauth,async(req,res)=>{
//     try {
//         res.render('index',{page:'sub_menu/questions/qns'});
//     } catch (error) {
//         res.status(500).send(); 
//     }
// });
// router.get('/Questions/4',logauth,async(req,res)=>{
//     try {
//         res.render('index',{page:'sub_menu/questions/qns'});
//     } catch (error) {
//         res.status(500).send(); 
//     }
// });
// router.get('/Questions/5',logauth,async(req,res)=>{
//     try {
//         res.render('index',{page:'sub_menu/questions/qns'});
//     } catch (error) {
//         res.status(500).send(); 
//     }
// });


// module.exports = router;