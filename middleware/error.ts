import { Request, Response, NextFunction } from "express";
import { ErrorType } from "../helper/enum";
import AppError from "../helper/error.helper";
import logger from "../helper/logger.helper";

interface AppErrorWithReason extends AppError {
  reason?: (typeof ErrorType)[keyof typeof ErrorType];
}

function generateErrorResponse(
  err: AppErrorWithReason,
  status: number,
  res: Response
): Response {
  const errObj: { [key: string]: any } = {
    code: status,
    status: false,
    message: err.message,
  };

  if (err.optionalInfo) {
    errObj["optional_info"] = err.optionalInfo;
  }
  return res.status(status).send(errObj);
}

function generateAndSendAppErrorResponse(
  err: AppErrorWithReason,
  res: Response
): Response {
  switch (err.reason) {
    case ErrorType.invalid_request:
      return generateErrorResponse(err, 400, res);
    case ErrorType.not_found:
      return generateErrorResponse(err, 404, res);
    case ErrorType.permission_denied:
      return generateErrorResponse(err, 403, res);
    case ErrorType.unauthorized:
      return generateErrorResponse(err, 401, res);
    case ErrorType.conflict:
      return generateErrorResponse(err, 409, res);
    case ErrorType.validation_error:
      return generateErrorResponse(err, 400, res);
    case ErrorType.unknown_error:
    default:
      // logger.error(err.stack);
      return generateErrorResponse(err, 500, res);
  }
}

export default function (
  err: AppErrorWithReason,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error({
    message: err.message,
    timestamp: new Date().toISOString(),
    endpoint: req.originalUrl,
    body: req.body,
    stack: err.stack,
  });
  console.error("-----------------------------------", err);
  console.log("--------------------- end of error -----------------------\n");
  generateAndSendAppErrorResponse(err, res);
}
