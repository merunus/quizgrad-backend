const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide your username"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adding createdAt and createdBy
  }
);

module.exports = mongoose.model("User", UserSchema);
