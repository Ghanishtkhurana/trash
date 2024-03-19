const WareHouseModel = require("../../models/Warhouse/adminWarehouse");

const AddWareHouse = async(req,res)=>{
    try {
       if(req?.role == "Admin"){
        const add = new WareHouseModel({
            ...req.body
        })
        await add.save()
        return res.status(200).json({message : "Ware House Added",status : true})
       }
       return res.status(400).json({message : "You are not an admin",status : false})
    } catch (error) {
        return res.status(400).json({message : error.message , status : false})
    }
}

module.exports = AddWareHouse;