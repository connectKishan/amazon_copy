const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
var crypto=require('crypto');
//User Schema attributes/fields/characterstics
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    email:{type:String, unique:true, lowercase:true},
    password:String,
    profile:{
        name:{type:String, default:''},
        picture:{type:String, default:''}
    },
    address:String,
    history:[{
        date:Date,
        paid:{type:Number,default:0},
        //item:{type:Schema.Types.ObjectId, ref:''}
    }]
});

//hash the password before saving to db
UserSchema.pre('save',function(next){
    var user=this;
    if(!user.isModified('password')) return next();
    /*bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err) return next(err);
            user.password=hash;
            next();
        });
    })*/
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password=hash;
        next();
    });
})

//compare password hash

UserSchema.methods.comparePassword=function(password){
return bcrypt.compareSync(password,this.password);
}

UserSchema.methods.gravatar=function(size){
    if(!this.size) size=200;
    if(!this.email) return 'https://secure.gravatar.com/avatar/3833eb69115e8148e3e8b5036a734b07';
    
    var md5=crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://secure.gravatar.com/avatar/'+md5+''
}
 
module.exports=mongoose.model('User',UserSchema);