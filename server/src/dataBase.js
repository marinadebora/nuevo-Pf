const mongoose = require("mongoose");
const config = require("./config");
require('dotenv').config();
const { MONGO_USERS} = process.env;


// conectamos nuestra base de datos
(async () =>
<<<<<<< HEAD
=======

>>>>>>> 97fc4e2357085773f149fa0e50590b5db41667f3
{
    try { 

        const db = await mongoose.connect(MONGO_USERS);
        console.log('conectada la db', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})() 



<<<<<<< HEAD
/////////////////////////////////PRUEBAS\\\\\\\\\\\\\\\\\\\\\\\\\\\
/* 
  (async()=>{
     try {
        
         const db = await mongoose.connect(`mongodb://localhost:27017/punto-yates`);
     console.log('conectada la db', db.connection.name + " haz tus pruebas")
     } catch (error) {
         console.error(error)
     }
 })() */
=======
//  (async()=>{
//     try {
        
//         const db = await mongoose.connect(`mongodb://localhost:27017/punto-yates`);
//     console.log('conectada la db', db.connection.name)
//     } catch (error) {
//         console.error(error)
//     }
// })() 
>>>>>>> 97fc4e2357085773f149fa0e50590b5db41667f3
