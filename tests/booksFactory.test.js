import { expect, test } from "@jest/globals";
import { generateFakeBooks } from "../src/database/factories/books.factory.js";

test("BooksFactory Generates number of books", () => {
  expect(generateFakeBooks(2)?.length).toEqual(2);
});

test("BooksFactory Generates a valid Book instance", () => {
  expect(Object.keys(generateFakeBooks(1)?.[0])).toStrictEqual([
    "book_name",
    "book_author",
    "book_category",
    "realase_year",
  ]);
});
