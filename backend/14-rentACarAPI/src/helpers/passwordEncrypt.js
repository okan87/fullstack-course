"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// passwordEncrypt(password:string):

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async function (password, next) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        next(err); // Hata yakalanır ve errorHandler'a iletilir
    }
}