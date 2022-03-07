import { Router } from "express";
import booksController from "../controllers/Books.js";
import { authenticatedRoute } from "../middlewares/Auth.js";
import { booksValidators } from "../validations/books.validation.js";
import { validationCatcher } from "../middlewares/validationMd.js";

const router = Router();

router.get("/books", booksController.find);

router.get(
  "/books/:id",
  booksValidators.findById,
  validationCatcher,
  booksController.findById
);
router.post(
  "/books",
  authenticatedRoute,
  booksValidators.create,
  validationCatcher,
  booksController.insert
);
router.put(
  "/books/:id",
  authenticatedRoute,
  booksValidators.update,
  validationCatcher,
  booksController.update
);
router.delete(
  "/books/:id",
  authenticatedRoute,
  booksValidators.delete_,
  validationCatcher,
  booksController.delete
);

export { router };
