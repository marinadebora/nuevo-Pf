const {Router} = require('express');
const Usuarios = require('../modelos/Usuarios');

const putUsuarioF = Router()

putUsuarioF.put("/:id", async (req, res)=>{
    const {id} = req.params
    const {favoritos} = req.body;
    try {
        if(id.length !== 24) res.status(404).send(`Rebise el id, porque tiene de mas o menos caracteres`)
        const actualizar = await Usuarios.findOneAndUpdate({_id: id},
            {favoritos: favoritos } // prueba las 2 formas a ver cual te convense
            /* {$push: {carritoDeCompra: carritoDeCompra}} */  //cons esta se mantiene lo que hay y se le agrega lo nuevo
        )
        actualizar ?
        res.send(`Se agrego a favoritos`):
        res.status(404).send(`no se pudo agregar`)
    } catch (error) {
        console.log(error)
    }
})


module.exports = putUsuarioF