const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");
const customer = require("../models/customerModel");
const Router = require("express");
const multer = require("multer");
const upload = require("../uploads/file");

router.post('/customer/add',function(req,res){   
    const cphnno = req.body.cphnno;
    customer.findOne({cphnno : cphnno})
    .then(function(cdata){
        if (cdata!=null){            
            res.send("Customer phone number already existed");
            return;
        }
        else
        {   
            const cusdata = new customer(req.body);
            cusdata.save();
            res.send("Succefully inserted!!");
        }
    })
    .catch(function(e){
        res.json(e)
    })
    
})


module.exports = router;