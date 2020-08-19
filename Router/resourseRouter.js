const express = require('express');
const router = new express.Router();
const session = require('express-session');
const {logauth,auth} = require('../controller/controller');

router.get('/Questions',logauth,(req,res)=>{
    try {
        res.render('index',{page:'sub_menu/semesters'});
    } catch (error) {
        res.status(500).send();
    }
});



module.exports = router;