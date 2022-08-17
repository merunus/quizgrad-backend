const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getMe,
  updateUser,
} = require("../controllers/UserController");
const checkAuth = require("../utils/checkAuth");
const handleValidationErrors = require("../utils/handleValidationErrors");
const {
  loginValidation,
  registerValidation,
  updateUserValidation,
} = require("../validation/validation");

router.post("/register", registerValidation, handleValidationErrors, register);
router.post("/login", loginValidation, handleValidationErrors, login);
router.get("/me", checkAuth, getMe);
router.get("/", (req, res) => {
  res.send("Quizlet API");
});
router.patch(
  "/updateUser/:id",
  checkAuth,
  updateUserValidation,
  handleValidationErrors,
  updateUser
);

module.exports = router;
