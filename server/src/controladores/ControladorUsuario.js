const Usuarios = require("../modelos/Usuarios")

const getUsuario = async(req,res)=>{
    const user = await Usuarios.find({}).populate({ 
        path:"historialDeCompra", 
        populate: { 
            path: 'productos.producto', 
            select: ['producto','imagenes','precio','dimensiones']
        }
    })
/* .populate({ 
    path:"historialDeCompra", 
    populate: { 
        path: 'usuario',
        select: ['email','nombre','apellido']
    }
    }) *//* .populate({ path: 'historialDeCompra', model: Historial }) esta es una manera de llenar los campos*/
        
    const map = user.map(e =>{
        return{
            _id: e._id,
            nombre: e.nombre,
            apellido: e.apellido,

            email: e.email,
            carritoDeCompra: e.carritoDeCompra,
            historialDeCompra: e.historialDeCompra,
            favoritos: e.favoritos,
            admin: e.admin

        }
    })
    res.send(map)
    /* res.send(user) */
}

module.exports = {getUsuario}