const express=require("express");
const mongoose=require("mongoose");
require("./database/database");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoute = require("./router/userRoute");
app.use(userRoute);


app.listen(90);
