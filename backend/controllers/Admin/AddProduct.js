const ProductModel = require("../../models/Products/product.model");

const AddProductsToWareHouse = async(req,res)=>{
    try {
       if(req?.role == "Admin"){
        const add = new ProductModel({
            ...req.body,
            leftCount:req?.body?.quantity
        })
        await add.save()
        return res.status(200).json({message : "Ware House Added",status : true})
       }
       return res.status(400).json({message : "You are not an admin",status : false})
    } catch (error) {
        return res.status(400).json({message : error.message , status : false})
    }
}

module.exports = AddProductsToWareHouse;