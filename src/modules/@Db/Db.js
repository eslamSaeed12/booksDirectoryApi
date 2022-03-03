import knex from "knex";
import { env } from "../@env/index.js";

const connection = knex({
  client: "pg",
  connection: {
    host: env("DB_HOST"),
    user: env("DB_USER"),
    password: env("DB_PASSWORD"),
    database: env("DB_NAME"),
  },
  searchPath: ["public", "knex"],
});

export { connection };
