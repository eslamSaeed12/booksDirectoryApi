import { connection } from "../modules/@Db/Db.js";
import { BooksRepository } from "../database/Repositores/BookRepostiory.js";

const booksRepository = new BooksRepository(connection);

export default {
  async find(req, res, next) {
    try {
      res.json(await booksRepository.find());
    } catch (error) {
      next(error);
    }
  },
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      res.json(await booksRepository.findByID(id));
    } catch (error) {
      next(error);
    }
  },
  async insert(req, res, next) {
    try {
      const { book_author, book_category, book_name, realase_year } = req.body;
      const book = await booksRepository.create({
        book_author,
        book_category,
        book_name,
        realase_year,
      });
      res.json(book);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { book_author, book_category, book_name, realase_year } = req.body;
      res.json(
        await booksRepository.update({
          id,
          book_author,
          book_category,
          book_name,
          realase_year,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      res.json(await booksRepository.delete(id));
    } catch (error) {
      next(error);
    }
  },
};
