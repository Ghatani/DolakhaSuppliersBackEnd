const mongoose = require("mongoose");

const material = mongoose.model("Material",{
    materialName : {type : String},
    materialPrice : {type : String},
    materialQuantity : {type : String}
})

module.exports = material;