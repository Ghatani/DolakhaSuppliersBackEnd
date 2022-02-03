const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");
const material = require("../models/materialModel");
const Router = require("express");
const multer = require("multer");
const upload = require("../uploads/file");

router.post('/material/add', auth.verifyUser, upload.single('material_image'), function(req,res){
    const materialName = req.body.materialName;
    const materialPrice = req.body.materialPrice;
    const materialQuantity = req.body.materialQuantity;
    const materialImage = req.file.filename;
    const data = new material({
        materialName : materialName,
        materialPrice : materialPrice,
        materialQuantity : materialQuantity,
        materialImage : materialImage
    });
    data.save()
    .then(function(){
        res.json({message : "Material Inserted!", success : true})
    }).catch(function(){
        res.json({message : "Something went wrong!"})
    });

})


router.put('/material/update', auth.verifyUser, function(req,res){
    const materialName = req.body.materialName;
    const materialPrice = req.body.materialPrice;
    const materialQuantity = req.body.materialQuantity;
    material.updateOne({_id : mid},{
        materialName : materialName,
        materialPrice : materialPrice,
        materialQuantity : materialQuantity,
    })
    .then(function(){
        res.json({messge : "Product Updated!"})
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})

router.delete('/material/delete/:mid', auth.verifyUser, function(req,res){
    const mid = req.params.mid;
    Product.deleteOne({_id : mid})
    .then(function(){
        res.json({message : "Deleted"})
    })
   .catch(function(){
       res.json({message : "something went wrong!"})
   })
})

router.get('/material/view',function(req,res){
    material.find()
    .then(function(result){
        res.json(result)
    })
    .catch(function(){
        res.json({message : "something went wrong"})
    })
})

module.exports = router;