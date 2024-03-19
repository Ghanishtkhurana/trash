const AuthModel = require("../../models/Auth/Users");
const ProductModel = require("../../models/Products/product.model");

const AddProductInOrder = async (req, res) => {
  const userId = req.userId;
  try {
    const findProduct = await ProductModel.findById(req.body?.products?.name)
    if(findProduct){
        const AddproductInUser = await AuthModel.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true }
          );
          const LessProductQuantity = await ProductModel.findByIdAndUpdate(req.body?.products?.name,{leftCount : (findProduct?.quantity - req.body?.products?.quantity)},{new : true})
          return res.status(200).json({ message: "Product Ordered", status: true });
    }
    else{
        return res.status(400).json({ message: "Product Not Found", status: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AddProductInOrder;
