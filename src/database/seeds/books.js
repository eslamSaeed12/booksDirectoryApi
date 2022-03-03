import { generateFakeBooks } from "../factories/books.factory.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("books").del();
  await knex("books").insert(generateFakeBooks(15));
}
