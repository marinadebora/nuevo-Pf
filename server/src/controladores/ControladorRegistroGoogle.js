const Usuarios= require("../modelos/Usuarios");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")

const {Router} = require('express')


const usuariosGoogle= Router()

usuariosGoogle.post("/", async (req,res,next)=>{
    const {email,password,nombre,apellido} = req.body;
    console.log(req.headers)
    const api = await Usuarios.findOne({email})
    console.log(api)
    if(api){
        let token = jwt.sign({api}, "torombolo", {
            expiresIn: "10h"
        })
        res.send({
            email:email,
            nombre:nombre,
            token:token,
            admin: api.admin,
            id: api._id
        })
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
            let token = jwt.sign({user}, "torombolo", {
                    expiresIn: "10h"
            })
            res.send({
                email:email,
                nombre:nombre,
                token:token,
                admin:false,
                id: user._id
            })
        }
    })
    next()
}
});

module.exports= usuariosGoogle