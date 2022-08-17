const mongoose = require("mongoose");

const ModuleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title!"],
    },
    language: {
      type: String,
      required: [true, "Please provide language"],
    },
    words: {
      type: Array,
      required: [true, "Please some words"],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created: {
      type: String,
    },
  },
  {
    timestamps: true, // Adding createdAt and createdBy
  }
);
module.exports = mongoose.model("Module", ModuleSchema);
