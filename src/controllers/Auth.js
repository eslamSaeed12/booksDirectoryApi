import bcryptjs from "bcryptjs";
import { connection } from "../modules/@Db/Db.js";
import { UsersRepository } from "../database/Repositores/UserRepository.js";
import httpErrors from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../modules/@env/index.js";

const usersRepository = new UsersRepository(connection);

export default {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const usr = await usersRepository.findByUsername({ username });

      if (!usr || !bcryptjs.compareSync(password, usr?.password)) {
        throw new httpErrors.Unauthorized(
          "password or username is not valid !"
        );
      }

      const userToken = jwt.sign(usr, env("JWT_SECRET"), {
        expiresIn: "2h",
      });

      res.json({ message: "success", token: userToken });
    } catch (err) {
      next(err);
    }
  },

  request(req, res, next) {
    res.json({ csrf_: req.csrfToken() });
  },
};
