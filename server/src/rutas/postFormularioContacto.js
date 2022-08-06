const { transporter } = require('../controladores/controladorPostEmail');



const correoContacto = async (req,res )=>{
    const {email,nombre,message} = req.body;
    try {
        await transporter.sendMail({
            from: '"Recibimos tu mensaje! 🚢" <accesoriosnautica02@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Contacto", // Subject line
            text: "", // plain text body
            html: `"Hola! 👋  ${nombre}"
            <p>Muchas gracias por comunicarte con nosotros, nos pondremos en contacto lo mas pronto posible!! </p>
            <br/>
            <p>Te recordamos el mensaje que nos enviaste: </p>
            <br/>
            <p> ${message} </p>
            <p>Puedes acceder a nuestra pagina para seguir viendo nustros productos!!</p>
            <p>Desde el siguiente enlace ⬇⬇
            <br>
            <link>🚢 https://nuevo-pf.vercel.app/ 🚢 </link>
            `, // html body
        }),
        await transporter.sendMail({
            from: '"Recibimos una consulta! 🚢" <accesoriosnautica02@gmail.com>', // sender address
            to: "accesoriosnautica02@gmail.com", // list of receivers
            subject: "Contacto", // Subject line
            text: "", // plain text body
            html: `"Formulario de contacto"
            <br/>
            <p>Persona que se contacta: ${nombre} </p>
            <p>Email: ${email} </p>
            <p>La consulta es: </p>
            <p> ${message} </p>
            `, // html body
        })
      res.send("Correo Enviado")
    } catch (error) {
        console.log(error)
        res.status(404).send("Error al enviar el correo")

    }
}
module.exports = {correoContacto};