import type { NextFunction, Request, Response } from "express";
import { DefaultStatusMessages, HttpStatusCodes } from "./statusCodes";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOparational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    // Error.captureStackTrace(this, this.constructor);
  }
}

export class ServerError extends AppError {
  constructor(
    message: string,
    statusCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode, true);
  }
}

export class BadRequestError extends AppError {
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.BAD_REQUEST]) {
        super(message, HttpStatusCodes.BAD_REQUEST, true);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.NOT_FOUND]) {
        super(message, HttpStatusCodes.NOT_FOUND, true);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.UNAUTHORIZED]) {
        super(message, HttpStatusCodes.UNAUTHORIZED, true);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.FORBIDDEN]) {
        super(message, HttpStatusCodes.FORBIDDEN, true);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.CONFLICT]) {
        super(message, HttpStatusCodes.CONFLICT, true);
    }
}

export class UnprocessableEntityError extends AppError {
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.UNPROCESSABLE_ENTITY]) {
        super(message, HttpStatusCodes.UNPROCESSABLE_ENTITY, true);
    }
}

export class MethodNotAllowedError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.METHOD_NOT_ALLOWED]) {
    super(message, HttpStatusCodes.METHOD_NOT_ALLOWED, true);
  }
}

export class NotAcceptableError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.NOT_ACCEPTABLE]) {
    super(message, HttpStatusCodes.NOT_ACCEPTABLE, true);
  }
}

export class RequestTimeoutError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.REQUEST_TIMEOUT]) {
    super(message, HttpStatusCodes.REQUEST_TIMEOUT, true);
  }
}

export class PayloadTooLargeError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.PAYLOAD_TOO_LARGE]) {
    super(message, HttpStatusCodes.PAYLOAD_TOO_LARGE, true);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE]) {
    super(message, HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE, true);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.TOO_MANY_REQUESTS]) {
    super(message, HttpStatusCodes.TOO_MANY_REQUESTS, true);
  }
}

export class PaymentRequiredError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.PAYMENT_REQUIRED]) {
    super(message, HttpStatusCodes.PAYMENT_REQUIRED, true);
  }
}

export class GoneError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.GONE]) {
    super(message, HttpStatusCodes.GONE, true);
  }
}

export class PreconditionFailedError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.PRECONDITION_FAILED]) {
    super(message, HttpStatusCodes.PRECONDITION_FAILED, true);
  }
}

export class NotImplementedError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.NOT_IMPLEMENTED]) {
    super(message, HttpStatusCodes.NOT_IMPLEMENTED, true);
  }
}

export class BadGatewayError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.BAD_GATEWAY]) {
    super(message, HttpStatusCodes.BAD_GATEWAY, true);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.SERVICE_UNAVAILABLE]) {
    super(message, HttpStatusCodes.SERVICE_UNAVAILABLE, true);
  }
}

export class GatewayTimeoutError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.GATEWAY_TIMEOUT]) {
    super(message, HttpStatusCodes.GATEWAY_TIMEOUT, true);
  }
}

export class InsufficientStorageError extends AppError {
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.INSUFFICIENT_STORAGE]) {
    super(message, HttpStatusCodes.INSUFFICIENT_STORAGE, true);
  }
}

export const handleError = (err: Error | AppError) => {
  if (err instanceof AppError && err.isOparational) {
    return {
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    };
  }

  return {
    status: "error",
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: DefaultStatusMessages[HttpStatusCodes.INTERNAL_SERVER_ERROR],
  };
};

export const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorResponse = handleError(err);
  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
