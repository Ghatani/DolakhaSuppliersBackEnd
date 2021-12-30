const mongoose = require("mongoose");

const customer = mongoose.model("Customer",{
    cname : {type : String},
    caddress : {type : String},
    cphnno : {type : String}
})

module.exports = customer;