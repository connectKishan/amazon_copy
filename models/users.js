const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
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
    });*/
    bcrypt.hash(user.Password, 10, function(err, hash) {
        if (err) next(err)
        user.password=hash
})
})

//compare password hash

UserSchema.methods.comparePassword=function(password){
return bcrypt.compareSync(password,this.password);
}
 
module.exports=mongoose.model('User',UserSchema);