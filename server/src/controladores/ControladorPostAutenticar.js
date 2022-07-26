const Usuarios = require("../modelos/Usuarios");
const jwt = require("jsonwebtoken")

const usuariosAuth = async (req, res) => {
    const { email, password } = req.body;
    const api = await Usuarios.findOne({ email })
    let nombre = ''
    let id = ''
    let admin = false
    if (api) {
        nombre = api.nombre
        id = api._id
        admin = api.admin
    }

    const permiso = await Usuarios.findOne({ email })
    if (permiso.baneado === true) {
        res.send('Disculpa pero te encuentras blocado')
    } else {
    Usuarios.findOne({ email }, (err, Usuarios) => {
        if (err) {
            res.status(404).send("Error al autenticar el correo")
        } else if (!Usuarios) {
            res.status(404).send("Hay campos erroneos")
        } else {
            Usuarios.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send("Error al autenticar")
                } else if (result) {
                    /* console.log(req.headers) */
                    let token = jwt.sign({ Usuarios }, "torombolo", {
                        expiresIn: "10h"
                    })
                    /* res.cookie("token", token, { expiresIn: "10h" }); */
                    res.send({ email, token, nombre, id, admin })
                    console.log(req.headers)
                } else {
                    res.status(500).send("Correo y/o contraseña incorrecta")
                }
            })
        }

    });
    }
    /* console.log(nombre) */
    

};

module.exports= {usuariosAuth}