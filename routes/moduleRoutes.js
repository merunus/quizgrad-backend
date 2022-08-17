const express = require("express");
const router = express.Router();
const {
  getAllModules,
  createModule,
  deleteModule,
  updateModule,
  getSingleModule,
  addWordsToModule,
  deleteWordFromModule,
  getAllModulesOfUser,
  editWord,
} = require("../controllers/ModuleController");
const checkAuth = require("../utils/checkAuth");
const handleValidationErrors = require("../utils/handleValidationErrors");
const {
  moduleCreateValidation,
  moduleWordsValidation,
} = require("../validation/validation");

// Get all Modules
router.get("/", getAllModules);
// Get all Modules of User ...
router.get("/user/:userId", checkAuth, getAllModulesOfUser);
// Get single Module
router.get("/:id", getSingleModule);
// Create Module
router.post(
  "/create",
  checkAuth,
  moduleCreateValidation,
  handleValidationErrors,
  createModule
);
// Update Module
router.patch(
  "/update/:id",
  checkAuth,
  moduleCreateValidation,
  handleValidationErrors,
  updateModule
);
// Add words to Module
router.patch(
  "/addWords/:id",
  checkAuth,
  moduleWordsValidation,
  handleValidationErrors,
  addWordsToModule
);
// Edit word
router.patch("/editWord/:id/:wordId", checkAuth, editWord);
// Delete words from Module
router.patch("/deleteWord/:id/:wordId", checkAuth, deleteWordFromModule);
// Delete Module
router.delete("/delete/:id", checkAuth, deleteModule);

module.exports = router;
