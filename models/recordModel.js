const mongoose = require("mongoose");

const record = mongoose.model("Records",{
    username : {type : String},
    recordDate : {type : String},
    materialName : {type : String},       
    cname : {type : String},
    caddress : {type : String},
    materialQty : {type : String}  
})

module.exports = record;