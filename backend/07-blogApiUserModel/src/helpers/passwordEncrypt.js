"use strict";

const crypto = require("node:crypto");

const keyCode = process.env.SECRET_KEY || "adasdadadada"
const loopCount = 10_000;
const charsCount = 32;
const encType = "sha512";

module.exports = function (password) {
    const encoded = crypto.pbkdf2Sync(password, keyCode, loopCount, charsCount, encType);
    return encoded.toString("hex");
}

