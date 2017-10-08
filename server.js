var express=require("express");
var morgan=require('morgan');
var mongoose=require('mongoose');
var app=express();
var User=require('./models/users');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var engine=require('ejs-mate');


mongoose.connect('mongodb://root:root@ds161164.mlab.com:61164/ecommerce',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("you are connected to mongoose labs database")
    }
})
//middleware
app.use(express.static(__dirname+'/public'))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('ejs',engine);
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('main/home');
})
app.get('/about',function(req,res){
    res.render('main/about');
})
app.post('/create-user',function(req,res,next){
    var user=new User(); 
     user.profile.name=req.body.name;
     user.password=req.body.password;
     user.email=req.body.email;
     user.save(function(err){
        
         if(err) return next(err);
         res.json('succesffuly created a new user')
     })
});
app.listen(4141,function(err){
    if(err) throw err;
    console.log("Server is running at 4141 port")
});
