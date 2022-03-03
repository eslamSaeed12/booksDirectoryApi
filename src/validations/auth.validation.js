import * as validator from "express-validator";

export const authValidators = {
  authenticate: [
    validator.body("username").isString().trim().escape(),
    validator.body("password").isString().trim().escape(),
  ],
};
