// firstname,last name,email,phone number,password
const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    
    text : {
        type : String,
        required : true
    },
    seen : {
        type : Boolean,
        required : "true",
        default:false
    },
    
},{timestamps:true , versionKey:false})

const NotificationModel = mongoose.model("notifcation",NotificationSchema)
module.exports = NotificationModel;