let mongoose = require("mongoose")
let  { Schema } = require("mongoose");

const historialsSchema = new Schema({
  usuario:{ type: mongoose.Schema.Types.ObjectId, ref:'Usuarios'},
  productos:{
    type: Array,
    required: true,
    trim:true
},

  fechaDeCompra: {type: Date, default: Date.now},
  precioTotal: {type: Number}, 
  pendiente:{type:Boolean,default:true},
  procesado:{type:Boolean,default:false},
  recibido:{type:Boolean,default:false},
  cancelado:{type:Boolean,default:false},  
 
},{timestamps:false})


module.exports = mongoose.model("Historials", historialsSchema)