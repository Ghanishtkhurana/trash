const ProductModel = require("../../models/Products/product.model");

const GetAllProducts = async () => {
  try {
    const getAll = await ProductModel.find({ $gt: { leftCount: 0 } });
    return res
      .status(200)
      .json({ message: "Get All Products", status: true, data: getAll });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetAllProducts;
