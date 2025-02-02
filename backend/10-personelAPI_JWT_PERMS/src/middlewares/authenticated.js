"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const jwt = require('jsonwebtoken')
module.exports=((req, res, next) => {
  const auth = req.headers?.authorization || null; //get Authorization
  const accessToken = auth ? auth.split(" ")[1] : null; //get jwt
  req.isLogin = false
  jwt.verify(accessToken, process.env.ACCESS_KEY, function(err,user){
    if(err){
        req.user = null
        console.log('JWT login : No')
    }else{
        req.isLogin=true
        req.user = user 
        console.log('jwt login:Yes')
    }
  })
  next();
});