import { body } from "express-validator";

 const addBookValidator = [
  body("title")
    .notEmpty().withMessage("Title is required"),

  body("subtitle")
    .optional()
    .isString().withMessage("Subtitle must be a string"),

  body("description")
    .notEmpty().withMessage("Description is required"),

  body("imageUrl")
    .notEmpty().withMessage("Image URL is required")
    .isURL().withMessage("Image URL must be a valid URL"),

  body("amazonIndUrl")
    .notEmpty().withMessage("Amazon India URL is required")
    .isURL().withMessage("Amazon India URL must be a valid URL"),

  body("amazonUsdUrl")
    .notEmpty().withMessage("Amazon US URL is required")
    .isURL().withMessage("Amazon US URL must be a valid URL")
];

 const updateBookValidator = [
  body("title")
    .optional()
    .isString().withMessage("Title must be a string"),

  body("subtitle")
    .optional()
    .isString().withMessage("Subtitle must be a string"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),

  body("imageUrl")
    .optional()
    .isURL().withMessage("Image URL must be valid"),

  body("amazonIndUrl")
    .optional()
    .isURL().withMessage("Amazon India URL must be valid"),

  body("amazonUsdUrl")
    .optional()
    .isURL().withMessage("Amazon US URL must be valid")
];





export {
  addBookValidator,
  updateBookValidator
}