const Accesorios = require('../modelos/Accesorios')


const PutStock = async(req,res,next)=>{
    const id = req.params
    const data = await Accesorios.findById({_id})
    res.send(data)
    console.log(data)
}



module.exports = {PutStock}