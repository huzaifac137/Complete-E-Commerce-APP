const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title : {type:String , required:true},
    price : {type:Number , required:true} ,
     quantity:  {type:Number , required:true},
     image : {type:String , required:true} ,
     userOfProduct : {type:mongoose.Types.ObjectId , required:true , ref : "user"}
});

module.exports = mongoose.model("product" , productSchema);