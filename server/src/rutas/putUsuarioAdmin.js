const {Router} = require("express")
let Usuario = require("../modelos/Usuarios")


const UsuariosAdmin = Router();
  UsuariosAdmin.put("/", async (req, res)=>{
    const { id } = req.body;
    let usuario =await Usuario.findById({_id:id})
    try{ if (usuario.admin===true){
         let cambio =await  Usuario.findOneAndUpdate({_id:id}, {admin:false})
         res.send(`El usuario ${cambio.nombre}, ya no es un administrador`)    
    }

    else{
         let cambio = await Usuario.findOneAndUpdate({_id:id}, {admin:true})
         res.send(`Ahora el usuario ${cambio.nombre} es un administrador`)
        }
    }catch(error){
        console.log(error)
    }
 } )

const UsuariosBaneo= Router();

 UsuariosBaneo.put("/", async (req, res)=>{
    const { id } = req.body;
    let usuario =await Usuario.findById({_id:id})
    try{ if (usuario.baneado===true){
         let cambio =await  Usuario.findOneAndUpdate({_id:id}, {baneado:false})
         res.send(`El usuario ${cambio.nombre}, ya no esta baneado`)    
    }
    else{
         let cambio = await Usuario.findOneAndUpdate({_id:id}, {baneado:true})
         res.send(`Ahora el usuario ${cambio.nombre} esta baneado`)
        }
        
    }catch(error){
        console.log(error)
    }
 } )





 module.exports={UsuariosAdmin, UsuariosBaneo}