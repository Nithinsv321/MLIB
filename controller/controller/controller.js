const session = require('express-session');

const logauth = (req,res,next)=>{
    if(!req.session.current){
        res.redirect('/Login');
    }else{
        next();
    }
}


const auth = (req,res,next)=>{
    if(req.session.current){
        res.redirect('/Home');
    }else{
        next();
    }
}

module.exports={logauth,auth};
