const jwt = require('jsonwebtoken');

const user = require('../models/userModel')

module.exports.verifyUser = (req, res, next)=>{
   try{ 
    const token = req.headers.authorization.split(" ")[1];
    const uData=jwt.verify(token, "SecretKey");
    user.findOne({_id : uData._id})
    .then((userData)=>{
    //    console.log(userData);
      req.userInfo = userData;     
      next();
    })
    .catch((e)=>{
        res.json({error: e});
    })}
    catch(e){
        res.json({error: e});

    }





 //   console.log(token);
}