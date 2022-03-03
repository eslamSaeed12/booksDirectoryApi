import * as validator from "express-validator";

export const booksValidators = {
  findById: validator.param("id").isNumeric(),
  create: [
    validator.body("book_name").isString().trim().escape(),
    validator.body("book_author").isString().trim().escape(),
    validator.body("book_category").isString().trim().escape(),
    validator.body("realase_year").isDate().trim(),
  ],
  update: [
    validator.param("id").isNumeric(),
    validator.body("book_name").isString().trim().escape(),
    validator.body("book_author").isString().trim().escape(),
    validator.body("book_category").isString().trim().escape(),
    validator.body("realase_year").isDate().trim(),
  ],
  delete_: validator.param("id").isNumeric(),
};
