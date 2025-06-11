import { body, param } from "express-validator";

// ─── CREATE COURSE ──────────────────────────────────────────────────
 const addCourseValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("subtitle")
    .optional()
    .isString()
    .withMessage("Subtitle must be a string"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("imageUrl")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("ctaUrl")
    .notEmpty()
    .withMessage("CTA URL is required")
    .isURL()
    .withMessage("CTA URL must be a valid URL"),
];

// ─── UPDATE COURSE ────────────────────────────────────────────────
 const updateCourseValidator = [
  param("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isUUID()
    .withMessage("Course ID must be a valid UUID"),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string"),

  body("subtitle")
    .optional()
    .isString()
    .withMessage("Subtitle must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("ctaUrl")
    .optional()
    .isURL()
    .withMessage("CTA URL must be a valid URL"),
];

// ─── COURSE ID VALIDATION FOR get/delete BY ID ─────────────────────
 const courseIdValidator = [
  param("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isUUID()
    .withMessage("Course ID must be a valid UUID"),
];

export{
    addCourseValidator,
    updateCourseValidator,
    courseIdValidator
}
