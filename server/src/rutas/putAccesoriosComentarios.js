const {Router} = require('express');
const Accesorios = require('../modelos/Accesorios');

const putAccesoriosComentarios = Router()

putAccesoriosComentarios.put("/:id", async (req, res)=>{
    const {id} = req.params
    const {comentarios} = req.body;
    try {
        if(id.length !== 24) res.status(404).send(`Rebise el id, porque tiene de mas o menos caracteres`)
        const actualizar = await Accesorios.findOneAndUpdate({_id: id},
            /* {comentarios: comentarios} */ // prueba las 2 formas a ver cual te convense
            {$push: {comentarios: comentarios}}  //cons esta se mantiene lo que hay y se le agrega lo nuevo
        )
        actualizar ?
        res.send(`Se agrego tu comentario`):
        res.status(404).send(`no se pudo agregar tu comentario`)
    } catch (error) {
        console.log(error)
    }
})


module.exports = putAccesoriosComentarios