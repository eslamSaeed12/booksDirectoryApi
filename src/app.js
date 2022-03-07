import { env } from "./modules/@env/index.js";
import { app } from "./server.js";

// bootstraping the server
app.listen(env("PORT"), () =>
  console.log(
    `Server is Run at port:${env("PORT")} with ${env("NODE_ENV")}-Environemnt`
  )
);