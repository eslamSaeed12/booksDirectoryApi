/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  if (!(await knex.schema.hasTable("users"))) {
    return knex.schema.createTable("users", (builder) => {
      builder.increments("id").primary();
      builder.string("username").notNullable();
      builder.string("password").notNullable();
      builder.boolean("isAdmin").defaultTo(false);
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
