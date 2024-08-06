import crypto from "crypto";

const resetToken = crypto.randomBytes(32).toString('hex');

console.log(resetToken)
console.log(resetToken.toString())