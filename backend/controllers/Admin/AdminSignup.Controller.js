const AuthModel = require("../../models/Auth/Users");
const bcrypt = require("bcrypt")

const AdminSignupController = async (req, res) => {
    const {email,password,phone_number} = req.body;
  try {
    const findExistingUser = await AuthModel.findOne({
      $or: [{ email }, { phone_number }],
    });
    if (findExistingUser) {
      return res
        .status(400)
        .json({ message: "Account Already Exist", status: false });
    }
    let hashPassword = await bcrypt.hashSync(password, 8);
    const AddAdmin = new AuthModel({ ...req.body,password:hashPassword,role : "Admin" ,approve_status : true});
    await AddAdmin.save();
    return res
      .status(200)
      .json({ message: "Account Created Successfully", status: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AdminSignupController;
