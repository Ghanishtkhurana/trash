const AuthModel = require("../../models/Auth/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const UserLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    let cookieOption = {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    const findUser = await AuthModel.findOne({
      $or: [{ email }, { phone_number: email }],
    });
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Account Not Exist", status: false });
    }
    let FindPassword = await bcrypt.compare(password, findUser.password);
    if (FindPassword) {
      if (findUser?.role == "User") {
        if (findUser?.approve_status) {
          let token = jwt.sign(
            {
              _id: findUser._id,
              firstname: findUser?.firstname,
              lastname: findUser?.lastname,
              email: findUser?.email,
              phonenumber: findUser?.phone_number,
              role : findUser?.role
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "3d",
            }
          );
          return res
            .cookie("learn", token, cookieOption)
            .status(200)
            .json({ message: "User Login Successfully", status: true });
        }
        return res
          .status(400)
          .json({ message: "You Are Not Approved", status: false });
      } else {

        let token = jwt.sign(
            {
              _id: findUser._id,
              firstname: findUser?.firstname,
              lastname: findUser?.lastname,
              email: findUser?.email,
              phonenumber: findUser?.phone_number,
              role : findUser?.role
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "3d",
            }
          );

        return res
          .cookie("learn", token, cookieOption)
          .status(200)
          .json({ message: "Admin Login Successfully", status: true });
      }
    }

    return res
      .status(400)
      .json({ message: "Wrong Credentials", status: false });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = UserLoginController;
