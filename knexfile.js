import { config } from "dotenv";
import url from "url";
import path from "path";
import { env } from "./src/modules/@env/index.js";
if (env("NODE_ENV") === "development") {
  config();
}

const __filename = url.fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
  client: "pg",
  connection: {
    host: env("DB_HOST"),
    user: env("DB_USER"),
    password: env("DB_PASSWORD"),
    database: env("DB_NAME"),
  },
  migrations: {
    directory: path.join(__dirname, "src/database/migrations"),
    extensions: [".js"],
  },
  seeds: {
    directory: path.join(__dirname, "src/database/seeds"),
    extensions: [".js"],
  },
};
