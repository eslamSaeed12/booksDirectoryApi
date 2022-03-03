import httpErrors from "http-errors";

export function serverError(err, req, res, next) {
  if (httpErrors.isHttpError(err)) {
    return res.status(err.statusCode).json(err.message);
  }

  return res
    .status(500)
    .json(new httpErrors.InternalServerError(e.message).message);
}
