/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import bcryptjs from "bcryptjs";
import { env } from "../../modules/@env/index.js";

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      username: env("SUPER_NAME"),
      password: bcryptjs.hashSync(env("SUPER_PASS")),
      isAdmin: true,
    },
    {
      username: env("TEST_NAME"),
      password: bcryptjs.hashSync(env("TEST_PASS")),
      isAdmin: false,
    },
  ]);
}
