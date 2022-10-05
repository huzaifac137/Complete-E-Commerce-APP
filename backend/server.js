const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

const userRoutes = require("./ROUTES/userRoutes");
const productRoutes = require("./ROUTES/productRoutes");
const paymentRoutes = require("./ROUTES/paymentRoutes");

app.use("/api/users" ,userRoutes );
app.use("/api/products" , productRoutes );
app.use("/api/payments" , paymentRoutes);

app.use((error, req ,res , next)=>{
    if(res.headerSent)
    {
        return next(error);
    }

     res.status(error.code || 500);
     res.json({message : error.message || "SOMETHING WENT WRONG"});
});

app.use((req , res ,next)=>{
     res.status(404);
     res.json({message :"COULD NOT FIND THIS ROUTE"});
     return next();
     
});

try
{ 
    mongoose.connect(process.env.DB_URI , {
        useNewUrlParser : true
    });

    app.listen(process.env.PORT || 5000); 
}

catch(error)
{
     console.log(error);
}

console.log("CONNECTED TO DATABASE ");
console.log("APP RUNNING");