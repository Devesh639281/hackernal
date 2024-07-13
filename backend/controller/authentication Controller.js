const {
  hashPassword,
  comaprePassword,
} = require("../helpers/authenticationhelp");
const Users = require("../model/authenticationModel");
const jwt = require("jsonwebtoken");
exports.registrationController = async (req, res) => {
  const { name, email, password, role, phone, address } = req.body;
  try {
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!role) {
      return res.send({ message: "Role is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    const users = await Users.findOne({ email });
    if (users) {
      return res.status(200).send({
        success: false,
        message: "Already Register User Go to Login",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await new Users({
      name,
      email,
      role,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comaprePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error During Login",
      error,
    });
  }
};

// Admin Access
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unathorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in isAdmin Middleware",
      error,
    });
  }
};
