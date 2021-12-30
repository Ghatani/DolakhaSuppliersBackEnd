const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();

const auth = require("../auth/auth");
const user = require("../models/userModel");
const Router = require("express");
const multer = require("multer");
const upload = require("../uploads/file");

router.post("/user/register",function(req,res)
{
    const username = req.body.username;
    user.findOne({username : username})
    .then(function(userdata){
        if(userdata!=null){
            res.json({message : "User already exist!!"});
            return;
        }        
        //this is for user registration
        const password = req.body.password;
        const phnno = req.body.phnno;

        bcryptjs.hash(password,10,function(e, hashed_value){
            const udata = new user({
                username : username,
                password : hashed_value,
                phnno : phnno
            })
            udata.save()
            .then(function(){
                res.json({message: "Successfully registered"});
            })
            .catch(function(e){
                res.json(e)
            })
        });
    })
})
// login route for user
router.post("/user/login",function(req,res){
    const username = req.body.username;
    user.findOne({username : username})
    .then(function(userdata){
        //console.log(userdata);
        if(userdata===null){
            return res.json({message : "Username not valid!!!", a : "TRY AGAIN", b: "EXIT"});
        }
        //comparing password with the database
        const password = req.body.password;
        bcryptjs.compare(password,userdata.password, function(e, result){
            //console.log(result);
            if (result===false){
                return res.json({message: "Invalid password!!!"})
            }
            //generate token --- jsonwebtoken
            const token = jwt.sign({userId : userdata._id},"secretkey");
            res.json({token: token, message : "success"});
        })

    })
})

//user update
router.put("/user/profile/update",auth.verifyUser,function(req,res){
    console.log(req.userInfo._id);
    const uid =req.userInfo._id;
    const phnno = req.body.phnno;
    user.updateOne({_id : uid},{phnno : phnno})
    .then(function()
    { res.json({msg : "Profile updated"})})
    .catch(function()
    { res.json({msg : "Someting went wrong, Please try agian!!"})}
    );
})

//delete user by self
// router.delete("/user/profile/delete",auth.verifyUser,function(req,res){
//     const uid = req.userInfo._id;
//     user.findByIdAndDelete(uid)
//     .then(function(){
//         res.json({msg : "Profile deleted"})
//     })
//     .catch(function(){
//         res.json({msg : "Someting went wrong!!"})
//     })
// })

//delete user by admin
// router.delete("user/profile/admin/delete",auth.verifyAdmin,function(req,res){
//     const _id = req.body._id;
//     user.deleteOne({_id : _id})
//     .then(function(){
//         res.json({msg : "Profile deleted"})
//     })
//     .catch(function(){
//         res.json({msg : "Someting went wrong!!"})
//     })
// })

router.post("/product/upload", upload.single('myimage'), function(req,res){
    console.log(req.file);
    if(req.file == undefined){
    return res.json({msg: "invalid file or no file at all"});
    }else{
    return res.json({msg: "file uploaded successfully!"});    
    }
    });

module.exports = router;