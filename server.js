var express=require("express");
var morgan=require('morgan');
var mongoose=require('mongoose');
var app=express();
var User=require('./models/users');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var engine=require('ejs-mate');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var flash=require('express-flash');


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

app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"kishan@ibk"
}));
app.use(flash());
app.engine('ejs',engine);
app.set('view engine','ejs');


var mainRoutes=require('./routes/main');
var userRoute=require('./routes/user')

app.use(mainRoutes);
app.use(userRoute);

app.listen(4141,function(err){
    if(err) throw err;
    console.log("Server is running at 4141 port")
});
