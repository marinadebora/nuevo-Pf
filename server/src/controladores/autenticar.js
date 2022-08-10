
const { transporter } = require('../controladores/controladorPostEmail');

const correo = async (req,res )=>{
    const {email,password,firstName,lastName,nombre, apellido} = req.body;
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
            <p>Nombre: ${firstName? firstName: nombre}</p>
            <p>Apellido: ${lastName? lastName: apellido}</p> 
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