var express=require("express");
var morgan=require('morgan');
var mongoose=require('mongoose');
var app=express();
var bodyParser=require('body-parser');
var ejs=require('ejs');
var engine=require('ejs-mate');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var flash=require('express-flash');
mongoose.Promise = global.Promise;
var MongoStore=require('connect-mongo')(session);
var passport=require('passport');




var secret=require('./config/secret');
var User=require('./models/users');
var Category = require('./models/category');

mongoose.connect(secret.database,function(err){
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
    secret:secret.secretKey,
    store:new MongoStore({url:secret.database,autoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user=req.user;
    next();
});

app.use(function(req, res, next) {
    Category.find({}, function(err, categories) {
      if (err) return next(err);
      res.locals.categories = categories;
      next();
    });
  });
  



app.engine('ejs',engine);
app.set('view engine','ejs');


var mainRoutes=require('./routes/main');
var userRoute=require('./routes/user');
var adminRoute=require('./routes/admin');
var apiRoutes=require('./api/api')

app.use(mainRoutes);
app.use(userRoute);
app.use(adminRoute);
app.use('/api',apiRoutes);

app.listen(secret.port,function(err){
    if(err) throw err;
    console.log("Server is running at port"+secret.port)
});
