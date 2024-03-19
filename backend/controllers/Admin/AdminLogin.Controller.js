const AuthModel = require("../../models/Auth/Users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const AdminLoginController = async (req, res) => {
    const {email , password} = req.body;
  try {
    let cookieOption = { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true , secure: true,sameSite : "none" };
    
    const findUser = await AuthModel.findOne({
        $or: [{ email }, { phone_number: email }],
        role: "Admin"
    });
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Account Not Exist", status: false });
    }
    let FindPassword = await bcrypt.compare(req.body?.password, findUser.password);
    if(FindPassword){

        let token = jwt.sign(
            {
              _id: findUser._id,
              firstname: findUser?.firstname,
              lastname: findUser?.lastname,
              email: findUser?.email,
              phonenumber: findUser?.phone_number,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "3d",
            }
          );
        
        return res.cookie("learn",token , cookieOption)
        .status(200)
        .json({ message: "Login Successfully", status: true });
    }
   
    return res
      .status(400)
      .json({ message: "Wrong Credentials", status: false });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AdminLoginController;
