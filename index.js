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
app.use(
  cors({
    origin: "*",
  })
);
app.use(xss());
app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// User Routes
app.use("/auth", userRouter);

// Module Routes
app.use("/modules", modulesRouter);

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
