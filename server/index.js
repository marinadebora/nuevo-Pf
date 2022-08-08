const app= require('./src/app');
const {PORT}= require('./src/config')
const Stripe = require("stripe")
let stripeSecret= "sk_test_51LTzChGPkJkLR4xlv1bZn2ffH0LhxYp9KKJT1CdWalxRssCJTRetuKAIFyDgZgzTqQceeg684neZorAoA6xv9W0r00H1rdPtmw"

const stripe = new Stripe(stripeSecret)



app.post('/checkout', async(req,res)=>{
    try{
        const {id, amount}= req.body
    
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Customers Cart",
            payment_method: id,
            confirm: true
        })
        console.log("pagoooooo back",payment )
        res.send({message:"Pago recibido exitosamente"})
    }

        catch(error){
            console.log(error)
            res.json({message:error.raw.message})
        }
})


app.listen( PORT, () =>{
    console.log(`server listening on port  ${PORT}`)
});
