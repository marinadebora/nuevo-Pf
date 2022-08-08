const jwt = require("jsonwebtoken")

exports.requireSignin = (req, res, next) => {
    const respuesta = req.headers.authorization
    console.log(respuesta)
    if(!respuesta) {
        res.status(400).send("Authorization required");
    } else {
        /* const token = req.headers.authorization.split(" ")[1] */;
        jwt.verify(respuesta, "torombolo",(error, usuario)=>{
            if(error){
                res.send('Acceso denegado')
            }else{
                next();
            }
        });
    }
};

exports.soloAdmin = (req, res, next) => {
    const respuesta = req.headers.authorization
    console.log(respuesta)
    if(!respuesta) {
        res.status(400).send("Authorization required");
    } else {
        /* const token = req.headers.authorization.split(" ")[1] */;
        jwt.verify(respuesta, "torombolo",(error, usuario)=>{
            if(error){
                res.send('Acceso denegado')
            }else{
                const inf = jwt.decode(respuesta, {complete: true})
                console.log(inf.payload.api.admin)
                if(inf.payload.api.admin === true){
                    next();
                }else{
                    res.status(404).send('no tienes acceso')
                }
            }
        });
    }
};