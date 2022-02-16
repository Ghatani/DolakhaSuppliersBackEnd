const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");
const material = require("../models/materialModel");
const Router = require("express");
const multer = require("multer");
const upload = require("../uploads/file");

//adding new materials details
router.post('/material/add', auth.verifyUser, function(req,res){
    const materialName = req.body.materialName;
    material.findOne({materialName : materialName})
    .then(function(cdata){
        if (cdata!=null){            
            res.json({message : "Material already existed!"})
            return;
        }
        else
        {   
            const materialPrice = req.body.materialPrice;
            const materialQuantity = req.body.materialQuantity;
            // const materialImage = req.file.filename;
            const data = new material({
                materialName : materialName,
                materialPrice : materialPrice,
                materialQuantity : materialQuantity,
                // materialImage : materialImage
            });
            data.save()
            .then(function(){
                 res.json({message : "Material Inserted!", success : true})
            }).catch(function(){
                res.json({message : "Something went wrong!"})
            });        
        }
    })
    .catch(function(e){
        res.json(e)
    })

})

//updating material details
router.put('/material/update', auth.verifyUser, function(req,res){
    const mid = req.body.mid;
    const materialName = req.body.materialName;
    const materialPrice = req.body.materialPrice;
    const materialQuantity = req.body.materialQuantity;
    material.updateOne({_id : mid},{
        materialName : materialName,
        materialPrice : materialPrice,
        materialQuantity : materialQuantity,
    })
    .then(function(){
        res.json({messge : "Material Updated!"})
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })

})

//delete the material
router.delete("/material/delete/:mid", auth.verifyUser, function(req,res){
    const mid = req.params.mid;
    material.deleteOne({_id : mid})
    .then(function(){
        res.json({message : "Material Deleted"})
    })
   .catch(function(){
       res.json({message : "Something went wrong!"})
   })
})

//view all the materials
router.get('/material/view', function(req,res){
    material.find()
    .then(function(result){
        res.json(result)
    })
    .catch(function(){
        res.json({message : "Something went wrong"})
    })
})

// view single material
router.get("/material/single/:mid", auth.verifyUser, function(req,res){
    const mid = req.params.mid;
     material.findOne({_id : mid})
     .then(function(result){
         res.json(result)
     })
     .catch(function(){
         res.json({message : "something went wrong"})
     })
})


router.put("/material/image/upload/:mid", auth.verifyUser, upload.single('material_image'), function(req,res){
    const mid = req.params.mid;
    const materialImage = req.file.filename;
    material.updateOne({_id : mid},{
        materialImage : materialImage
    })
    .then(function(){
        res.json({messge : "Image added to material"})
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })
})

//adding the quantity of material when new record is added
router.put("/material/update/quantity/:id", auth.verifyUser, function(req,res){
    //const mid = req.params.id;
    const materialName = req.body.materialName;
    const materialQuantity = req.body.materialQty;
    material.updateOne({materialName : materialName},{materialQuantity : materialQuantity})
})


module.exports = router;