const app= require('./app');


const mongoose = require("mongoose");
const config = require("./config");
const { MONGO_USERS,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD, } = process.env;

// conectamos nuestra base de datos
(async () =>
{
    try {

        const db = await mongoose.connect(MONGO_USERS || `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.mxvbffi.mongodb.net/${MONGO_DATABASE}`);
        console.log('conectada la db', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})()


app.listen(process.env.PORT, () =>{
    console.log('server listening successfully ')
});

