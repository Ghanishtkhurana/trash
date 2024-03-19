// firstname,last name,email,phone number,password
const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone_number : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : "true",
        enum : ["Admin","User"],
        default:"User"
    },
    approve_status : {
        type :Boolean,
        default : null
    },
    status : {
        type : String,
        enum : ["active","block"]
    },
    password : {
        type : String,
        required : true
    },
    products : [{
        name :  {type : mongoose.Schema.Types.ObjectId},
        quantity :{type : Number}

    }]
},{timestamps:true , versionKey:false})

const AuthModel = mongoose.model("auth",AuthSchema)
module.exports = AuthModel;