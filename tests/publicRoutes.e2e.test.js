import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { execSync } from "child_process";
import supertest from "supertest";
import { connection } from "../src/modules/@Db/Db.js";
import { env } from "../src/modules/@env/index.js";
import { app } from "../src/server.js";

let server;

beforeAll(() => {
  execSync("npm run db:rollback && npm run db:migrate && npm run db:seed");
  server = app.listen(env("PORT"));
});

describe("Non Protected Routes E2E", () => {

  
  it("GET: API/XSXSSDSD -> Should Returns 404 when not found route", async () => {
    const res = await supertest(`http://127.0.0.1:${env("PORT")}`).get(
      "/api/auth/xxsdsds"
    );
    expect(res.statusCode).toEqual(404);
  });

  it("GET: API/AUTH/CSRF -> Should Returns a csrf token", async () => {
    const res = await supertest(`http://127.0.0.1:${env("PORT")}`).get(
      "/api/auth/csrf"
    );
    expect(res.body).toHaveProperty("csrf_");
    expect(typeof res.body.csrf_).toEqual("string");
  });
  it("GET: API/BOOKS -> Should Returns Books Array", async () => {
    const res = await supertest(`http://127.0.0.1:${env("PORT")}`).get(
      "/api/books"
    );

    expect(res.body.length).toBeTruthy();
    expect(res.body[0]).toHaveProperty("book_name");
  });

  it("GET: API/BOOK/:ID -> Should Returns Book", async () => {
    const res = await supertest(`http://127.0.0.1:${env("PORT")}`).get(
      "/api/books/5"
    );
    expect(res.body).toHaveProperty("book_name");
  });

  it("GET: API/BOOK/:ID -> Should Returns null when id not found", async () => {
    const res = await supertest(`http://127.0.0.1:${env("PORT")}`).get(
      "/api/books/-55"
    );

    expect(res.body).not.toHaveProperty("book_name");
  });

  it("GET: API/BOOK/:ID -> Should Returns Bad Request when id valid type", async () => {
    const res = await supertest(`http://127.0.0.1:${env("PORT")}`).get(
      "/api/books/hello world"
    );
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await server.close();
  await connection.destroy();
});
