const Usuarios= require("../modelos/Usuarios");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")

const {Router} = require('express')


const usuariosGoogle= Router()

usuariosGoogle.post("/", async (req,res,next)=>{
    const {email,password,nombre,apellido} = req.body;
    
    const api = await Usuarios.findOne({email})
    console.log(api)
    if(api){ 
        res.send(api)
    }else{
    const user = new Usuarios({
        email:email,
        password:password,
        nombre: nombre,
        apellido:apellido
    });
    user.save(err =>{
        if(err){
            console.log(err)
            res.status(404).send("Error al registar el usuario");
        }else{
            let token = jwt.sign({ email: email}, "torombolo", {
                    expiresIn: "10h"
            })
            res.send({
                email:email,
                nombre:nombre,
                token:token
            })
        }
    })
    next()
}
});

module.exports= usuariosGoogle