const mongoose = require("mongoose");
const user = require("./userModel");
const customer = require("./customerModel");

const transaction = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    username : {type : String},
    transName : {type : String},
    transDate : {
        type : Date,
        default : Date.now,
    },
    transAmount : {type : String}
})

module.exports = mongoose.model('Transaction',transaction);