const {Router} = require("express");
const getEmbarVenta = require("./getEmbarcacionesVenta");
const getEmbarRenta = require("./getEmbarcacionesRenta");
const getAccesorios = require("./getAccesorios");
const getAccesoriosId = require("./getAccesoriosId");
const getEmbarVentaId = require("./getEmbarcacionesVentaid");
const getEmbarRentaId = require("./getEmbarcacionesRentaId");
const getTodo = require("./getTodo");
const getTodoId = require("./getTodoId");
const postEmbarcacionesRenta = require("./postEmbarcacionesRentas");
const postEmbarcacionesV = require("./postEmbarcacionesVentas");
const postAccesorios = require("./postAccesorios");
const putEmbarcacionesRenta = require("./putEmbarcacionesRenta");
const putAccesorios = require("./putAccesorios");
const putEmbarcacionesV = require("./putEmbarcacionesVenta");
const deleteEmbarcacionesVenta = require("./deleteEmbarcacionesVentas");
const deleteEmbarcacionesRenta = require("./deleteEmbarcacionesRentas");
const deleteAccesorios = require("./deleteAccesorios");
// const deleteEmbarcacionesVenta = require("./deleteEmbarcacionesVenta");
// const deleteEmbarcacionesRenta = require("./deleteEmbarcacionesRenta");
const { categorias } = require("../controladores/controladorCategorias");
//const { cargarVentas, cargarRenta, cargarAccesorios} = require("../controladores/CargaVentas");
const postCategorias = require("./postCategoria");
const { usuarios } = require("../controladores/controladorPostRegistro");
const { usuariosAuth } = require("../controladores/ControladorPostAutenticar");
const {correo}= require("../controladores/autenticar")
const  getUsuario  =require ("../controladores/ControladorUsuario")
const {agregarAlCarrito, borrarCarrito, asignarUsuarioAlCarrito} = require("../controladores/controladorCarrito");
const { requireSignin, soloAdmin } = require("../controladores/Verificaciones");
const putUsuario = require("./putUsuarioCarrito");
const putUsuarioF = require("./putUsuarioFavs");
const putAccesoriosComentarios = require("./putAccesoriosComentarios");
const { UsuarioId } = require("../controladores/controladorIdUsuario");
/* const {getUsuario} = require("../controladores/ControladorUsuario") */

const controladorHistoria = require("../NuevaHistoria/controladorHistoria");
const { updateHistorial } = require("../NuevaHistoria/controladorPutHistoria");
const { correoCompra } = require("../controladores/autenticarCompra");
const usuariosGoogle = require('../controladores/ControladorRegistroGoogle');
const { correoContacto } = require("./postFormularioContacto");
/* const app = require("../modelos/SesionGoogle.js") */
const {PutStock} = require("../controladores/controladorPutStock");
const { UsuariosAdmin, UsuariosBaneo } = require("./putUsuarioAdmin");

let router = Router();

router.use("/", controladorHistoria)


router.use("/embarcacionesV", getEmbarVenta);
router.use("/embarcacionesVId", getEmbarVentaId);
router.use("/embarcacionesR",/* requireSignin, */ getEmbarRenta);
router.use("/embarcacionesRId", getEmbarRentaId);
router.use("/accesorios",/* requireSignin, */ getAccesorios);
router.use("/accesorio", getAccesoriosId);
router.use("/todos", getTodo);
router.use("/todos", getTodoId);
router.use("/embarcacionesR",/* soloAdmin, */ postEmbarcacionesRenta);
router.use("/embarcacionesV",postEmbarcacionesV);
router.use("/accesorio",postAccesorios);
router.use("/embarcacionesR", putEmbarcacionesRenta);
router.use("/accesorio", putAccesorios);
router.use("/embarcacionesV",putEmbarcacionesV);
router.use("/embarcacionesV",deleteEmbarcacionesVenta);
router.use("/embarcacionesR",deleteEmbarcacionesRenta);
router.use("/accesorio",deleteAccesorios);
router.post("/registro",usuarios,correo);
router.post("/autenticar",usuariosAuth); 
router.get("/categorias", categorias);
router.use("/categorias", postCategorias);
router.use('/correo', correo);
router.post("/carrito/:id", agregarAlCarrito);
router.delete("/carrito",borrarCarrito);
router.get("/categorias", categorias);
router.use("/categorias", postCategorias);
router.get("/user",getUsuario);
router.use("/user", putUsuario);
router.use("/userfavs", putUsuarioF);
router.use("/comentario", putAccesoriosComentarios);
router.get("/usuario/:id",UsuarioId);
router.put("/historial/:id",updateHistorial,correoCompra);
router.post("/contactForm",correoContacto);
router.delete("/carrito",borrarCarrito)
router.use("/actualizarAdmin", UsuariosAdmin)
router.use("/actualizarBaneado",UsuariosBaneo)

/* router.get("/categorias", categorias)
router.use("/categorias", postCategorias) */

/* router.use("/user", putUsuario)
router.use("/comentario", putAccesoriosComentarios)
router.get("/usuario/:id",UsuarioId) */


/* router.use("/", app) */

router.use("/registroGoogle", usuariosGoogle, correo)


// no ejecutar esta ruta para no replicar los documentos de la base de datos
// router.use("/a", cargarVentas)
// router.use("/b", cargarRenta)
// router.use("/c", cargarAccesorios)


router.put("/stock/:id", PutStock)


module.exports = router;
