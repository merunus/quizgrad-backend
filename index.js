const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const userRouter = require("./routes/userRoutes");
const modulesRouter = require("./routes/moduleRoutes");
const xss = require("xss-clean");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(helmet());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT || 5555, () =>
      console.log(`Server is listening on port 5555`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

// User Routes
app.use("/auth", userRouter);

// Module Routes
app.use("/modules", modulesRouter);
