const Usuarios= require("../modelos/Usuarios");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")
const findOrCreate = require("mongoose-findorcreate")
const {Router} = require('express')


const usuariosGoogle= Router()

usuariosGoogle.post("/", async (req,res,next)=>{
    const {email,password,nombre,apellido} = req.body;
    /* try {
        const api = await Usuarios.findOrCreate({email},{email,password,nombre,apellido})
        console.log(api)
        let token = jwt.sign({ email: email}, "torombolo", {
            expiresIn: "10h"
        })
        res.send({
            email:email,
            nombre: nombre + ' ' + apellido,
            token:token
        })
        next()
    } catch (error) {
        console.log(error)
    } */
    
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
    /* console.log(api)
    if(api){ 
        res.status(404).send('El usuario ya existe')
    }else{
    const user = new Usuarios({
        email
        password
        nombre
        apellido
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
                nombre:firstName,
                token:token
            })
        }
    })
    next()
    } */
});

module.exports= usuariosGoogle