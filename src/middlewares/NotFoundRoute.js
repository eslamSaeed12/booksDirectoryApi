import httpErrors from "http-errors";

export function NotFoundRoute(req, res, next) {
  next(new httpErrors.NotFound());
}
