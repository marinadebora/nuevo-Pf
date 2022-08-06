const { transporter } = require('../controladores/controladorPostEmail');

const correoCompra = async (req,res )=>{
    const {email} = req.body;
    try {
        await transporter.sendMail({
            from: '"Estado de tu compra🚢" <accesoriosnautica02@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "AccesoriosNautica", // Subject line
            text: "", // plain text body
            html: `"Hola! 👋  ${email}"
            <p>Hubo cambios en el estado de tu compra!! 📦</p>
            <br/>
            <br/>
            <p>Puedes acceder a nuestra pagina para ver como continua tu compra!!</p>
            <p>Desde el siguiente enlace ⬇⬇
            <br>
            <link>🚢 https://nuevo-pf.vercel.app/ 🚢 </link>
            `, // html body
        });
        return("Correo Enviado")
    } catch (error) {
        console.log(error)
        res.status(404).send("Error al enviar el correo")

    }
}
module.exports = {correoCompra};