const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/* const passportLocalMongoose = require('passport-local-mongoose') */
/* const findOrCreate = require("mongoose-findorcreate") */


const UsuariosSchema = new Schema({
    email:{type:String,required:true,lowercase:true},
    password:{type:String,},
    nombre:{type:String,lowercase:true},
    apellido:{type:String,lowercase:true},
    carritoDeCompra:{type:Array},
    historialDeCompra:[{ type: Schema.Types.ObjectId, ref:"Historials"}],
    favoritos:{type:Array},
    admin:{type:Boolean,default:false}
})

const saltRounds = 10;
UsuariosSchema.pre("save",function(next){
    if(this.isNew || this.isModified("password")){
        const document= this;

        bcrypt.hash(document.password,saltRounds,(err,hashedPassword)=>{
            if(err){
                next(err);

            }else {
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

UsuariosSchema.methods.isCorrectPassword= function(password,callback){
    bcrypt.compare(password,this.password,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });

}
/* UsuariosSchema.plugin(findOrCreate) */
module.exports=mongoose.model("Usuarios",UsuariosSchema)



