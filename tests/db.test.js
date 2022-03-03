import { connection } from "../src/modules/@Db/Db.js";
import { BooksRepository } from "../src/database/Repositores/BookRepostiory.js";
import { config } from "dotenv";
import { execSync } from "child_process";
import { expect, test, afterAll, beforeAll } from "@jest/globals";
import { UsersRepository } from "../src/database/Repositores/UserRepository.js";
import { env } from "../src/modules/@env/index.js";

let booksRepository;
let usersRepository;

beforeAll(() => {
  if (process.env.NODE_ENV === "development") {
    config();
  }
  execSync("npm run db:rollback && npm run db:migrate && npm run db:seed");
  booksRepository = new BooksRepository(connection);
  usersRepository = new UsersRepository(connection);
});

test("Database Connection", (done) => {
  connection.schema
    .raw("select 1")
    .then((v) => {
      expect(v).toBeTruthy();
      done();
    })
    .catch(done);
});

test("Books Repository -> FIND ALL BOOKS", (done) => {
  booksRepository
    .find()
    .then((books) => {
      expect(books?.length).toBeGreaterThan(10);
      done();
    })
    .catch(done);
});

test("Books Repository -> FIND A BOOK  BY ID", (done) => {
  booksRepository
    .findByID(1)
    .then((book) => {
      expect(book).toBeTruthy();
      done();
    })
    .catch(done);
});

test("Books Repository -> Create A Book", (done) => {
  booksRepository
    .create({
      book_name: "real life matter",
      book_author: "solsveske",
      book_category: "drama",
      realase_year: "1995/05/02",
    })
    .then((book) => {
      expect(book).toBeTruthy();
      done();
    })
    .catch(done);
});

test("Books Repository -> Update A Book", (done) => {
  booksRepository
    .update({
      id: 1,
      book_name: "chemist",
      book_author: "AlChemist",
      book_category: "science",
      realase_year: "1995/05/02",
    })
    .then((book) => {
      expect(book).toBeTruthy();
      done();
    })
    .catch(done);
});

test("Books Repository -> Delete A Book", (done) => {
  booksRepository
    .delete(1)
    .then((book) => {
      expect(book).toBeFalsy();
      done();
    })
    .catch(done);
});

test("Users Repository -> find a user by Username", (done) => {
  usersRepository
    .findByUsername({ username: env("SUPER_NAME") })
    .then((usr) => {
      expect(usr).toBeDefined();
      done();
    })
    .catch(done);
});

afterAll(async () => {
  await connection.destroy();
});
