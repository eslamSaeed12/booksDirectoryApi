import httpErrors from "http-errors";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../database/Repositores/UserRepository.js";
import { connection } from "../modules/@Db/Db.js";
import { env } from "../modules/@env/index.js";

const usersRepository = new UsersRepository(connection);

export async function authenticatedRoute(req, res, next) {
  const token = req.headers["x-access-token"];


  try {
    if (!token) {
      throw new httpErrors.Unauthorized("unAuthroized !");
    }

    const payload  = jwt.verify(token, env("JWT_SECRET"));

    if (!payload?.username) {
      throw new httpErrors.Unauthorized("unAuthroized !");
    }



    const usr = await usersRepository.findByUsername({
      username: payload?.username,
    });

    if (!usr) {
      throw new httpErrors.Unauthorized("unAuthroized !");
    }

    next();
  } catch (err) {
    next(err);
  }
}
