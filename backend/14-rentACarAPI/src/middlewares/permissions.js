"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {

    isLogin: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.errorStatusCode = 403;
            next(new Error('NoPermission: You must login.'));
        }
    },

    isAdmin: (req, res, next) => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.errorStatusCode = 403;
            next(new Error('NoPermission: You must login and be an Admin.'));
        }
    },
}