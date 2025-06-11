import { body } from "express-validator";

export const registerAdminValidator = [
  body("email")
    .isEmail().withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

export const loginAdminValidator= [
    body("email")
    .isEmail().withMessage("Please provide a valide email"),

    body("password")
    .notEmpty().withMessage("password is required")
    
]
