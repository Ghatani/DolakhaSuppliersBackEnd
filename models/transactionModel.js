const mongoose = require("mongoose");

const transaction = mongoose.model("Transactions",{
    username : {type : String},
    transName : {type : String},
    transDate : {type : String},
    transAmount : {type : String}
})

module.exports = transaction;