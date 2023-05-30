
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

const webhook =async(req ,res , next)=>{
   
    const sig = req.headers["stripe-signature"];
    let event;

    try
    {
        event =  stripe.webhooks.constructEvent(
            req.body , sig , process.env.WEBHOOK_SK
        );
    }

    catch(err)
     {
        const error = new Error(`WEBHOOK ERROR : ${err.message}`);
        console.log(`WEBHOOK ERROR : ${err.message}`);
        error.code =400;
        return next(error);
     }

     if(event.type==="checkout.session.completed" )
     {      
         
     }
};

module.exports = webhook;