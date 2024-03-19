const AuthModel = require("../../models/Auth/Users");

const GetAllUsers = async (req, res) => {
  try {
   if(req?.role=="Admin"){
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { phone_number: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  keyword.role = "User";

  const getAllUser = await AuthModel.find(keyword);
  return res.status(200).json({ message: "Get All Users", status: true,data : getAllUser });
   }
  
    return res.status(400).json({ message: "You Are not An Admin", status: false });
   
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetAllUsers;
