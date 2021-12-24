const mongoose = require("mongoose");

const user = mongoose.model("User",{
    username : {type : String},
    password : {type : String},
    phnno : {type : String}
})

module.exports = user;