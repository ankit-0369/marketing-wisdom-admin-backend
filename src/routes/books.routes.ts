import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import {
  addBookController,
  deleteBookController,
  getAllBooksController,
  getBookByIdController,
  getBookBySlugController,
  updateBookController,
} from "../controllers/books.controller";
import { validateRequest } from "../middleware/validate.middleware";
import {
  addBookValidator,
  updateBookValidator,
} from "../validators/books.validator";

const router = Router();

router
  .route("/add")
  .post(verifyJWT, addBookValidator, validateRequest, addBookController);

router.route("/get-all").get(getAllBooksController);

router
  .route("/edit/:bookId")
  .put(verifyJWT, updateBookValidator, validateRequest, updateBookController);

router.route("/delete/:bookId").delete(verifyJWT, deleteBookController);
router.route("/:bookId").get(getBookByIdController);
router.route("/slug/:slug").get(getBookBySlugController);
// router.route('/search').get() //unplanned

export default router;
