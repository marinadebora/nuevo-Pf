const Usuarios = require("../modelos/Usuarios");

const UsuarioId= async(req,res)=>{
const {id}=req.params;
try {
    const usuario= await Usuarios.findById(id)
    res.send(usuario);
} catch (error) {
    res.status(400).send("Usuario NO encontrado");
}

}

module.exports = {UsuarioId}