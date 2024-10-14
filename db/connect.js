const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // or true, based on your preference

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
