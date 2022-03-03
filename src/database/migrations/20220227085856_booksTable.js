/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  if (!(await knex.schema.hasTable("books"))) {
    return await knex.schema.createTable("books", function (bluebrint) {
      bluebrint.increments("id").primary();
      bluebrint.string("book_name").notNullable();
      bluebrint.string("book_author").notNullable();
      bluebrint.string("book_category").notNullable();
      bluebrint.datetime("realase_year").notNullable();
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return await knex.schema.dropTableIfExists("books");
}
