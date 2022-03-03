import validators from "express-validator";
import httpErrors from "http-errors";

export function validationCatcher(req, res, next) {
  const result = validators.validationResult(req);
  if (!result.isEmpty()) {
    return next(new httpErrors.BadRequest(result.array()));
  }

  next();
}
