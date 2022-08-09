const {Router} = require("express")
const Usuarios = require("../modelos/Usuarios")
const Historials = require("./Historia")

let router = Router()

const getHistoriaToUser =async ()=>{
    let historias = await Historials.find({}).populate("usuario",{
        password:0,
        carritoDeCompra:0,
        historialDeCompra:0,
        favoritos:0,
        admin:0,
        __v:0
    }).populate("productos.producto",{
        categorias:0,
        stock:0,
        valoraciones:0,
        rating:0,
        comentarios:0,
        createdAt:0,
        updatedAt:0,
        descripcion:0
    })
    return historias;
}


//////////////////////////////////////////////////////////
//////                    RUTAS                     //////
//////////////////////////////////////////////////////////

router.get("/historias", async (req,res)=>{
    let historias =  await getHistoriaToUser()
    res.send(historias)

})

router.post("/historia", async(req,res,next)=>{
    const {precioTotal, productos,usuario} = req.body;
    try {
        const user = await Usuarios.findById(usuario)
       
        
        let newHistoria = new Historials({
            precioTotal,
            productos,
            usuario: user._id
        })
        if(!productos){
            res.status(404).send('debe seleccionar productos')
        }else{
            let nuevaHistoria = await newHistoria.save()
            const aniade = await Usuarios.findOneAndUpdate({
                _id: user._id},
                {$push: {
                    historialDeCompra:nuevaHistoria.id
                }
            })
            
            res.send("la historia se creo correctamente cuesta: " + nuevaHistoria.precioTotal)
        }
        
        // next()
    } catch (error) {
    console.log(error);   
    }
})

module.exports = router
