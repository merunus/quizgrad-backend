const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const googleAuth = async (req, res) => {
  try {
    const { email, id, userName } = req.body;
    const user = await User.findOne({ email }).select("-__v");

    // If user doesn't exist

    if (!user) {
      console.log("user is not found");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(id, salt);
      const doc = new User({
        email,
        userName,
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
      return res.json({
        ...userData,
        token,
        googleAuth: true,
      });
    }

    // If user exists

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    await User.findByIdAndUpdate(user._id, { token });
    const { ...userData } = user._doc;
    res.json({
      ...userData,
      token,
      googleAuth: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

module.exports = { googleAuth };
