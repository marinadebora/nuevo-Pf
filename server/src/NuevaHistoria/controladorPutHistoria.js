const Historials = require("./Historia");

const updateHistorial= async (req,res)=>{
    const {id}=req.params;
    const {pendiente,procesado,recibido,cancelado}=req.body;
    try {
    const update = await Historials.findOneAndUpdate({id},{pendiente,procesado,recibido,cancelado});
    res.send(update)
    } catch (error) {
        res.status(404).send("No se pudo actualizar");
    }
    
}

module.exports= {updateHistorial};