const AuthModel = require("../../models/Auth/Users");

const UserDelete = async (req, res) => {
  const userId = req.params.id;
  try {
    if(req?.role == "Admin"){
      const findUser = await AuthModel.findById(userId);
    if (findUser) {
      const userDelete = await AuthModel.findByIdAndDelete(userId);
      return res.status(200).json({message : "User Deleted",status : true})
    } else {
      return res.status(400).json({ message: "User Not Found", status: false });
    }
    }
    return res.status(400).json({ message: "You are not an Admin", status: false });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = UserDelete;
