const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {type :String , required : true} ,
    email : {type: String , required : true} ,
    password : {type : String , required : true} ,
    products : [{type : mongoose.Types.ObjectId , required : true , ref : "product"}]
});

module.exports = mongoose.model("user" , userSchema);