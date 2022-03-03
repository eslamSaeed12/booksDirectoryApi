import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { execSync } from "child_process";
import supertest from "supertest";
import { connection } from "../src/modules/@Db/Db.js";
import { env } from "../src/modules/@env/index.js";
import { app } from "../src/server.js";
import cookie from "cookie";

const uri = `http://127.0.0.1:${env("PORT")}`;

let server;
let csrf;
let cookies;
let token;

beforeAll(async () => {
  // sync database
  execSync("npm run db:rollback && npm run db:migrate && npm run db:seed");

  // run the server
  server = app.listen(env("PORT"));

  // getting CSRF REQUEST
  const csrfRequest = await supertest(uri).get("/api/auth/csrf");
  csrf = csrfRequest.body.csrf_;
  const cok = csrfRequest.headers["set-cookie"];
  cookies = cookie.parse(cok[0]);
  csrf = csrfRequest.body.csrf_;

  // GETTING JWT TOKEN REQUEST
  const tokenRequest = await supertest(uri)
    .post("/api/auth/login")
    .query({ _csrf: csrf })
    .set("Cookie", `_csrf=${cookies["_csrf"]}`)
    .send({
      username: env("SUPER_NAME"),
      password: env("SUPER_PASS"),
    });
  token = tokenRequest.body.token;
});

describe("Protected Routes E2E", () => {
  it("POST: API/AUTH/LOGIN -> Should Returns a forbiden when csrf token not found", (done) => {
    supertest(uri).post("/api/auth/login").expect(403, done);
  });

  it("POST: API/AUTH/LOGIN -> Should Returns a bad request body not valid", (done) => {
    supertest(uri)
      .post("/api/auth/login")
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .expect(400, done);
  });

  it("POST API/AUTH/LOGIN -> RETURNS JWT TOKEN", (done) => {
    supertest(uri)
      .post("/api/auth/login")
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .send({ username: env("SUPER_NAME"), password: env("SUPER_PASS") })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
        done();
      });
  });

  it("POST API/BOOKS -> create a book", (done) => {
    supertest(uri)
      .post("/api/books")
      .set(`x-access-token`, token)
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .send({
        book_name: "testBook",
        book_author: "testAuthor",
        book_category: "testCategory",
        realase_year: "2022/02/01",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("POST API/BOOKS -> bad request when not valid body", (done) => {
    supertest(uri)
      .post("/api/books")
      .set(`x-access-token`, token)
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .send({
        book_name: "testBook",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("PUT API/BOOKS -> update book", (done) => {
    supertest(uri)
      .put("/api/books/5")
      .set(`x-access-token`, token)
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .send({
        book_name: "updated one",
        book_author: "testAuthor",
        book_category: "testCategory",
        realase_year: "2022/02/01",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("PUT API/BOOKS -> failed on not valid body", (done) => {
    supertest(uri)
      .put("/api/books/5")
      .set(`x-access-token`, token)
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .send({
        book_author: "testAuthor",
        book_category: "testCategory",
        realase_year: "2022/02/01",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("DELETE API/BOOKS -> deletes a book", (done) => {
    supertest(uri)
      .delete("/api/books/5")
      .set(`x-access-token`, token)
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("POST API/AUTH/LOGIN Not Exist user", (done) => {
    supertest(uri)
      .post("/api/auth/login")
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .send({ username: "notUser", password: "notfound" })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(401);
        done();
      });
  });
  it("POST API/AUTH/LOGIN Not Exist user", (done) => {
    supertest(uri)
      .post("/api/auth/login")
      .set("Cookie", `_csrf=${cookies["_csrf"]}`)
      .query({ _csrf: csrf })
      .set("body",new XMLSerializer())
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toEqual(500);
        done();
      });
  });
});

afterAll(async () => {
  await server.close();
  await connection.destroy();
});
