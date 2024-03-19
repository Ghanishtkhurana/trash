const mongoose = require("mongoose")

const WareHouseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true

    },
    location : {
        type : String,
    },
    latitude : {
        type : String,
        required : true

    },
    longitude : {
        type : String,
        required : true

    },
    products : [{type : mongoose.Schema.Types.ObjectId}]
},{timestamps:true , versionKey:false})

const WareHouseModel = mongoose.model("warehouse",WareHouseSchema)
module.exports = WareHouseModel;