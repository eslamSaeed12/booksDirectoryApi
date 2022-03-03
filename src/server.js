import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { env } from "./modules/@env/index.js";
import morgan from "morgan";
import cors from "cors";
import timeout from "connect-timeout";
import limiter from "express-rate-limit";
import csurf from "csurf";
import booksController from "./controllers/Books.js";
import authController from "./controllers/Auth.js";
import { authenticatedRoute } from "./middlewares/Auth.js";
import { serverError } from "./middlewares/ServerErrror.js";
import { NotFoundRoute } from "./middlewares/NotFoundRoute.js";
import { booksValidators } from "./validations/books.validation.js";
import { authValidators } from "./validations/auth.validation.js";
import { validationCatcher } from "./middlewares/validationMd.js";
// global varaibles

const isDev = env("NODE_ENV") === "development";

// constructing expresss instance
const app = express();

// default configs variables

const cookieConfig = {
  httpOnly: !isDev,
  secret: env("COOKIE_SECRET"),
  secure: !isDev,
  maxAge: 24 * 60 * 60 * 1000,
  //expires: new Date().getTime() + 24 * 3600 * 1000, // session valid for one day
};

// setting global middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser(env("COOKIE_SECRET")));
app.use(cookieSession(cookieConfig));
app.use(morgan("combined"));
app.use(cors("*"));
app.use(timeout("30s"));
app.use(
  limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(
  csurf({
    cookie: cookieConfig,
  })
);

// assign routes

// books routes
app.get("/api/books", booksController.find);
app.get(
  "/api/books/:id",
  booksValidators.findById,
  validationCatcher,
  booksController.findById
);
app.post(
  "/api/books",
  authenticatedRoute,
  booksValidators.create,
  validationCatcher,
  booksController.insert
);
app.put(
  "/api/books/:id",
  authenticatedRoute,
  booksValidators.update,
  validationCatcher,
  booksController.update
);
app.delete(
  "/api/books/:id",
  authenticatedRoute,
  booksValidators.delete_,
  validationCatcher,
  booksController.delete
);

// auth routes
app.post(
  "/api/auth/login",
  authValidators.authenticate,
  validationCatcher,
  authController.login
);

app.get("/api/auth/csrf", authController.request);

// error handlers
app.use(NotFoundRoute);
app.use(serverError);

export { app };
