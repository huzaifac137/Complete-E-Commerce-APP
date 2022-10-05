
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

const idempotencyKey = Math.random() * Math.random();

const stripePayment=async(req,res,next)=> {

    const{line_items , customer_email} =req.body;


    if(!line_items || !customer_email)
    {
        const error = new Error("MISSING REQUIRED PARAMETERS ");
        error.code = 400;
        return next(error);
    }

    let session;
    try
    {
        session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"] ,
            mode :"payment" ,
            line_items : line_items ,
            customer_email : customer_email ,
            success_url : `${process.env.CLIENT_URL}/payments/success` ,
            cancel_url : `${process.env.CLIENT_URL}/payments/failure` ,
            shipping_address_collection : {allowed_countries : ["GB" , "US"]}
        });
    }

    catch
    {
        const error = new Error("CHECKOUT SESSION FAILED, SERVER ERROR  ");
        error.code = 500;
        return next(error);
    } 

        res.json({sessionId :session.id}).status(200);   
        console.log("success") ;
    

};


     
exports.stripePayment = stripePayment;