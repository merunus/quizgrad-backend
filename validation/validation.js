const { body } = require("express-validator");

const registerValidation = [
  body("email", "Please provide valid email!").isEmail(),
  body("password", "Please provide valid password!").isLength({ min: 5 }),
  body("userName", "Please provide valid username!").isLength({
    min: 3,
    max: 20,
  }),
];
const loginValidation = [
  body("email", "Please provide valid email!").isEmail(),
  body("password", "Please provide valid password!").isLength({ min: 5 }),
];
const updateUserValidation = [
  body("newUsername", "Please provide valid username!").isLength({
    min: 3,
    max: 20,
  }),
  body("newEmail", "Please provide valid email!").isEmail(),
];
const moduleCreateValidation = [
  body("title", "Please provide title!").isLength({ max: 40 }).isString(),
  body("language", "Please provide language!").isLength({ max: 25 }).isString(),
  body("words", "Words must contain at least 2 words")
    .isArray()
    .isLength({ min: 2 }),
  body("words.*.word")
    .isString()
    .withMessage("Word must be a string")
    // .isLength({ min: 2, max: 20 })
    // .withMessage("Word must be longer than 2 letters")
    .exists()
    .withMessage("Must exists"),
  body("words.*.translate")
    .isString()
    .withMessage("Word must be a string")
    // .isLength({ min: 2, max: 20 })
    // .withMessage("Word must be longer than 2 letters")
    .exists()
    .withMessage("Must exists"),
];
const moduleWordsValidation = [
  //   body().isArray(),
  body("words.*.word", "Word must be string")
    .isString()
    .exists()
    .withMessage("Word must exists"),
  // .isLength({ min: 2 })
  // .withMessage("Word must be at least two letters length"),
  body("words.*.translate", "Translate must be a string")
    .isString()
    .exists()
    .withMessage("Word must exists"),
  // .isLength({ min: 2 })
  // .withMessage("Word must be at least two letters length"),
];

module.exports = {
  registerValidation,
  loginValidation,
  moduleCreateValidation,
  moduleWordsValidation,
  updateUserValidation,
};
