const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");
const record = require("../models/recordModel");

//to insert record
router.post("/record/add", auth.verifyUser, function(req,res){
    const username = req.body.username;
    const recordDate = req.body.recordDate;
    const materialName = req.body.materialName;
    const cname = req.body.cname;
    const caddress = req.body.caddress;
    const materialQty = req.body.materialQty;
    const userid = req.userInfo._id;
    const data = new record({
        userid : userid,
        username : username,
        recordDate : recordDate,
        materialName : materialName,
        cname : cname,
        caddress : caddress,
        materialQty : materialQty
    })
    data.save()
    .then(function()
    { res.json({msg : "Succefully updated"})})
    .catch(function()
    { res.json({msg : "Someting went wrong, Please try agian!!"})}
    );

})

router.put('/record/update',auth.verifyUser, function(req,res){
    const rid = req.body.rid;
    const username = req.body.username;
    const recordDate = req.body.recordDate;
    const materialName = req.body.materialName;
    const cname = req.body.cname;
    const caddress = req.body.caddress;
    const materialQty = req.body.materialQty;
    record.updateOne({_id : rid},{
        username : username,
        recordDate : recordDate,
        materialName : materialName,
        cname : cname,
        caddress : caddress,
        materialQty : materialQty
    })
    .then(function()
    { res.json({msg : "Succefully updated"})})
    .catch(function()
    { res.json({msg : "Someting went wrong, Please try agian!!"})}
    );

})



module.exports = router;