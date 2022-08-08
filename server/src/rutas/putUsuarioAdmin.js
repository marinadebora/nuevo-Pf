const {Router} = require("express")
let Usuario = require("../modelos/Usuarios")


 const UsuariosAdmin = Router();

 UsuariosAdmin.put("/:id", async (req, res)=>{
    const {_id} = req.params
    const { admin } = req.body;
    let usuario =await Usuario.findById({_id})
    try{ if (admin===true){
         let cambio =await  Usuario.findOneAndUpdate({_id}, {admin:false})
         res.send(`El usuario ${cambio.nombre}, ya no es un administrador`)    
    }
    else{
         let cambio = await Usuario.findOneAndUpdate({_id}, {admin:true})
         res.send(`Ahora el usuario ${cambio.nombre} es un administrador`)
        }
        
    }catch(error){
        console.log(error)
    }
 } )

const UsuariosBaneo= Router();

 UsuariosBaneo.put("/:id", async (req, res)=>{
    const {_id} = req.params
    const { baneado } = req.body;
    let usuario =await Usuario.findById({_id})
    try{ if (baneado===true){
         let cambio =await  Usuario.findOneAndUpdate({_id}, {baneado:false})
         res.send(`El usuario ${cambio.nombre}, ya no esta baneado`)    
    }
    else{
         let cambio = await Usuario.findOneAndUpdate({_id}, {baneado:true})
         res.send(`Ahora el usuario ${cambio.nombre} esta baneado`)
        }
        
    }catch(error){
        console.log(error)
    }
 } )





 module.exports={UsuariosAdmin, UsuariosBaneo}