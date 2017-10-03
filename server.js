const express=require("express");
const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express();
const User=require('./models/users');
const bodyParser=require('body-parser');

mongoose.connect('mongodb://root:root@ds161164.mlab.com:61164/ecommerce',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("you are connected to mongoose labs database")
    }
})
//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/create-user',function(req,res,next){
    var user=new User(); 
     user.profile.name=req.body.name;
     user.password=req.body.password;
     user.email=req.body.email;
     user.save(function(err){
         if(err) next(err);
         res.json('succesffuly created a new user')
     })
})
app.listen(4141,function(err){
    if(err) throw err;
    console.log("Server is running at 4141 port")
})
