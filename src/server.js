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
import { serverError } from "./middlewares/ServerErrror.js";
import { NotFoundRoute } from "./middlewares/NotFoundRoute.js";
import swagger from "swagger-ui-express";
import jsdoc from "swagger-jsdoc";
import { openApiOpts } from "../documention.js";
import * as authRoutes from "./routes/auth.js";
import * as booksRoutes from "./routes/books.js";

// global varaibles

const jsDocConf = jsdoc(openApiOpts);
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

app.use("/api", authRoutes.router);
app.use("/api", booksRoutes.router);

app.use(
  "/docs",
  swagger.serve,
  swagger.setup(jsDocConf, {
    customSiteTitle: "books dir docs",
  })
);

// error handlers
app.use(NotFoundRoute);
app.use(serverError);

export { app };
