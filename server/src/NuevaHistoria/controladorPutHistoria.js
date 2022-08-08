const Historials = require("./Historia");
const Usuario = require("../modelos/Usuarios")

const updateHistorial= async (req,res,next)=>{
    const {id}=req.params;
    const{email}= req.body;
    const usuario= await Usuario.findOne({email})
    const {pendiente,procesado,recibido,cancelado}=req.body;
    try {
    const update = await Historials.findOneAndUpdate({id},{pendiente,procesado,recibido,cancelado});
    res.send(update)
    next()
    } catch (error) {
        res.status(404).send("No se pudo actualizar");
    }
}

module.exports= {updateHistorial};