import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import {
  addCourseValidator,
  courseIdValidator,
  updateCourseValidator,
} from "../validators/courses.validator";
import { validateRequest } from "../middleware/validate.middleware";
import {
  addCourseController,
  deleteCourseController,
  getAllCourseController,
  getCourseByIdController,
  getCourseBySlugController,
  updateCourseController,
} from "../controllers/courses.controller";

const router = Router();

router
  .route("/add")
  .post(verifyJWT, addCourseValidator, validateRequest, addCourseController);
router.route("/get-all").get(getAllCourseController);
router
  .route("/edit/:courseId")
  .put(
    verifyJWT,
    updateCourseValidator,
    validateRequest,
    updateCourseController
  );
router
  .route("/delete/:courseId")
  .delete(
    verifyJWT,
    courseIdValidator,
    validateRequest,
    deleteCourseController
  );
router.route("/:courseId").get(getCourseByIdController);
router.route("/slug/:slug").get(getCourseBySlugController);
export default router;
