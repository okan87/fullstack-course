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
            throw new Error("NoPermission: You must be login.")
             
        }

    },
    isAdmin: (req,res,next)=>{
        if(req.isLogin && req.user.isAdmin){
            next()
        }else{
            errorStatusCode=403
            throw new Error('NoPermission: You must be login and to be admin.')
        }
    },

}