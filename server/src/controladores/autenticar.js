
const { transporter } = require('../controladores/controladorPostEmail');
const Router = require("express"); 
const router = Router();

// router.post("/", 
// // body('contact_user','El nombre es obligatorio').notEmpty(),
// // body('correo_user','El correo es obligatorio').isEmail(),
// // body('asunto_user','El asunto es obligatorio').notEmpty(),
// // body('descripcion_user','la descripsion es obligatoria').notEmpty(),
// validacioncampos, async (req, res) => {
//     const {email } = req.body;
  
//     try {-
//         await transporter.sendMail({
//             from: ` <accesoriosnautica02@gmail.com>`, // sender address
//             to: email, // list of receivers
//             subject: ` -> AccesoriosNautica`, // Subject line
//             text: "", // plain text body,
//             html:`<b>de:AccesoriosNautica </b>
//             <br></br>
//             <p>Tu usuario se creo correctamente</p>
//             `
//           });
//           return res.json({
//             ok: true,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.json({
//             ok: false,
//         });
//     }
// });


const correo = async (req,res )=>{
    const {email,password,firstName,lastName} = req.body;
    try {
        await transporter.sendMail({
            from: '"Usuario Creado 🚢" <accesoriosnautica02@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "AccesoriosNautica", // Subject line
            text: "", // plain text body
            html: `"<b>De:accesoriosnautica02@gmail.com</b>"
            <p>Tu solicitud de registro fue exitosa!!🎉</p>
            <p>Y te registraste con las credenciales:</p>
            <br/>
            <p>Nombre: ${firstName}</p>
            <p>Apellido: ${lastName}</p> 
            <p>Password: ${password}</p>
            <br/>
            <p>Puedes acceder a nuestra pagina desde el siguiente enlace:</p>
            <link>🚢https://nuevo-pf.vercel.app/🚢</link>
            `, // html body
        });
        return("Correo Enviado")
    } catch (error) {
        /* res.status(404).send("Error al enviar el correo") */
        console.log(error)

    }
}
module.exports = {correo};