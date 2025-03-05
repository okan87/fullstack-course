"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
    isLogin: (req,res,next)=>{
        if(req.isLogin){
            next()
        }else{
            res.errorStatusCode=403
            next(new Error("NoPermission: You must be logged in."))
             
        }

    },
    isAdmin: (req,res,next)=>{
        if(req.isLogin && req.user.isAdmin){
            next()
        }else{
            errorStatusCode=403
            next(new Error("NoPermission: You must be logged in and an admin."));
        }
    },

}