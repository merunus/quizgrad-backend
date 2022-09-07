const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res.status(501).json({
        message: "This email already used!",
      });
    }

    const doc = new User({
      email: req.body.email,
      userName: req.body.userName,
      passwordHash: hash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("-__v");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Something went wrong! Please check if email and password are correct!",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No permission!",
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const newUserName = req.body.newUsername;
  const newEmail = req.body.newEmail;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { userName: newUserName, email: newEmail } }
    );
    const token = jwt.sign(
      {
        _id: userId,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const user = await User.find({ _id: userId });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = { register, login, getMe, updateUser };
