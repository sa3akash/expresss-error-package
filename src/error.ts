import type { NextFunction, Request, Response } from "express";
import { DefaultStatusMessages, HttpStatusCodes } from "./statusCodes";

/**
 * Convert a numeric HTTP status code to its constant key name from `HttpStatusCodes`.
 * Example: `500 -> 'INTERNAL_SERVER_ERROR'`.
 */
const getStatusCodeKey = (statusCode: number): string => {
  const match = Object.keys(HttpStatusCodes).find(
    (k) => (HttpStatusCodes as any)[k] === statusCode
  );
  return match ?? "INTERNAL_SERVER_ERROR";
};

/**
 * Base application error class that extends the native Error class.
 * Used to create standardized application errors with HTTP status codes.
 * 
 * @example
 * const error = new AppError('Something went wrong', 500);
 * 
 * @class
 * @extends {Error}
 */
export class AppError extends Error {
  public code: string;
  /**
   * Creates an AppError instance.
   * @param {string} message - The error message
   * @param {number} statusCode - The HTTP status code (e.g., 400, 500)
   * @param {boolean} [isOparational=true] - Whether this is an operational error that can be handled gracefully
   * @param {string} [code] - A short machine-friendly error code (e.g. 'NOT_FOUND')
   */
  constructor(
    public message: string,
    public statusCode: number,
    public isOparational: boolean = true,
    code?: string
  ) {
    super(message);
    this.code = code ?? getStatusCodeKey(statusCode);
    Object.setPrototypeOf(this, AppError.prototype);
    // Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Server error class for 5xx HTTP status codes.
 * Represents errors that occur on the server side.
 * 
 * @example
 * throw new ServerError('Database connection failed');
 * 
 * @class
 * @extends {AppError}
 */
export class ServerError extends AppError {
  /**
   * Creates a ServerError instance.
   * @param {string} message - The error message describing the server error
   * @param {number} [statusCode=500] - The HTTP status code (defaults to 500 Internal Server Error)
   */
  constructor(
    message: string,
    statusCode: number = HttpStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode, true);
  }
}

/**
 * Bad request error class for 400 HTTP status code.
 * Represents client request errors with invalid parameters or format.
 * 
 * @example
 * throw new BadRequestError('Invalid email format');
 * 
 * @class
 * @extends {AppError}
 */
export class BadRequestError extends AppError {
    /**
     * Creates a BadRequestError instance.
     * @param {string} [message='Bad Request'] - The error message (defaults to standard 400 message)
     */
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.BAD_REQUEST]) {
        super(message, HttpStatusCodes.BAD_REQUEST, true);
    }
}

/**
 * Not found error class for 404 HTTP status code.
 * Represents when a requested resource cannot be found.
 * 
 * @example
 * throw new NotFoundError('User not found');
 * 
 * @class
 * @extends {AppError}
 */
export class NotFoundError extends AppError {
    /**
     * Creates a NotFoundError instance.
     * @param {string} [message='Not Found'] - The error message (defaults to standard 404 message)
     */
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.NOT_FOUND]) {
        super(message, HttpStatusCodes.NOT_FOUND, true);
    }
}

/**
 * Unauthorized error class for 401 HTTP status code.
 * Represents authentication failures or missing credentials.
 * 
 * @example
 * throw new UnauthorizedError('Invalid credentials');
 * 
 * @class
 * @extends {AppError}
 */
export class UnauthorizedError extends AppError {
    /**
     * Creates an UnauthorizedError instance.
     * @param {string} [message='Unauthorized'] - The error message (defaults to standard 401 message)
     */
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.UNAUTHORIZED]) {
        super(message, HttpStatusCodes.UNAUTHORIZED, true);
    }
}

/**
 * Forbidden error class for 403 HTTP status code.
 * Represents when a user is authenticated but lacks permission to access a resource.
 * 
 * @example
 * throw new ForbiddenError('You do not have permission to access this resource');
 * 
 * @class
 * @extends {AppError}
 */
export class ForbiddenError extends AppError {
    /**
     * Creates a ForbiddenError instance.
     * @param {string} [message='Forbidden'] - The error message (defaults to standard 403 message)
     */
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.FORBIDDEN]) {
        super(message, HttpStatusCodes.FORBIDDEN, true);
    }
}

/**
 * Conflict error class for 409 HTTP status code.
 * Represents resource conflicts such as duplicate entries or version conflicts.
 * 
 * @example
 * throw new ConflictError('Email already exists');
 * 
 * @class
 * @extends {AppError}
 */
export class ConflictError extends AppError {
    /**
     * Creates a ConflictError instance.
     * @param {string} [message='Conflict'] - The error message (defaults to standard 409 message)
     */
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.CONFLICT]) {
        super(message, HttpStatusCodes.CONFLICT, true);
    }
}

/**
 * Unprocessable entity error class for 422 HTTP status code.
 * Represents validation errors where the request format is correct but semantically incorrect.
 * 
 * @example
 * throw new UnprocessableEntityError('Invalid data provided');
 * 
 * @class
 * @extends {AppError}
 */
export class UnprocessableEntityError extends AppError {
    /**
     * Creates an UnprocessableEntityError instance.
     * @param {string} [message='Unprocessable Entity'] - The error message (defaults to standard 422 message)
     */
    constructor(message: string = DefaultStatusMessages[HttpStatusCodes.UNPROCESSABLE_ENTITY]) {
        super(message, HttpStatusCodes.UNPROCESSABLE_ENTITY, true);
    }
}

/**
 * Method not allowed error class for 405 HTTP status code.
 * Represents when a request method (GET, POST, etc.) is not allowed for a resource.
 * 
 * @example
 * throw new MethodNotAllowedError('POST method not allowed on this endpoint');
 * 
 * @class
 * @extends {AppError}
 */
export class MethodNotAllowedError extends AppError {
  /**
   * Creates a MethodNotAllowedError instance.
   * @param {string} [message='Method Not Allowed'] - The error message (defaults to standard 405 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.METHOD_NOT_ALLOWED]) {
    super(message, HttpStatusCodes.METHOD_NOT_ALLOWED, true);
  }
}

/**
 * Not acceptable error class for 406 HTTP status code.
 * Represents when the server cannot produce a response matching acceptable media types.
 * 
 * @example
 * throw new NotAcceptableError('Requested format not supported');
 * 
 * @class
 * @extends {AppError}
 */
export class NotAcceptableError extends AppError {
  /**
   * Creates a NotAcceptableError instance.
   * @param {string} [message='Not Acceptable'] - The error message (defaults to standard 406 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.NOT_ACCEPTABLE]) {
    super(message, HttpStatusCodes.NOT_ACCEPTABLE, true);
  }
}

/**
 * Request timeout error class for 408 HTTP status code.
 * Represents when the server times out waiting for the client request.
 * 
 * @example
 * throw new RequestTimeoutError('Request took too long to complete');
 * 
 * @class
 * @extends {AppError}
 */
export class RequestTimeoutError extends AppError {
  /**
   * Creates a RequestTimeoutError instance.
   * @param {string} [message='Request Timeout'] - The error message (defaults to standard 408 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.REQUEST_TIMEOUT]) {
    super(message, HttpStatusCodes.REQUEST_TIMEOUT, true);
  }
}

/**
 * Payload too large error class for 413 HTTP status code.
 * Represents when the request body exceeds the server's maximum allowed size.
 * 
 * @example
 * throw new PayloadTooLargeError('File size exceeds 10MB limit');
 * 
 * @class
 * @extends {AppError}
 */
export class PayloadTooLargeError extends AppError {
  /**
   * Creates a PayloadTooLargeError instance.
   * @param {string} [message='Payload Too Large'] - The error message (defaults to standard 413 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.PAYLOAD_TOO_LARGE]) {
    super(message, HttpStatusCodes.PAYLOAD_TOO_LARGE, true);
  }
}

/**
 * Unsupported media type error class for 415 HTTP status code.
 * Represents when the request body media type is not supported.
 * 
 * @example
 * throw new UnsupportedMediaTypeError('application/xml not supported');
 * 
 * @class
 * @extends {AppError}
 */
export class UnsupportedMediaTypeError extends AppError {
  /**
   * Creates an UnsupportedMediaTypeError instance.
   * @param {string} [message='Unsupported Media Type'] - The error message (defaults to standard 415 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE]) {
    super(message, HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE, true);
  }
}

/**
 * Too many requests error class for 429 HTTP status code.
 * Represents rate limiting when too many requests are received in a short time.
 * 
 * @example
 * throw new TooManyRequestsError('Rate limit exceeded. Please try again later.');
 * 
 * @class
 * @extends {AppError}
 */
export class TooManyRequestsError extends AppError {
  /**
   * Creates a TooManyRequestsError instance.
   * @param {string} [message='Too Many Requests'] - The error message (defaults to standard 429 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.TOO_MANY_REQUESTS]) {
    super(message, HttpStatusCodes.TOO_MANY_REQUESTS, true);
  }
}

/**
 * Payment required error class for 402 HTTP status code.
 * Represents when payment is required to access the resource.
 * 
 * @example
 * throw new PaymentRequiredError('Premium subscription required');
 * 
 * @class
 * @extends {AppError}
 */
export class PaymentRequiredError extends AppError {
  /**
   * Creates a PaymentRequiredError instance.
   * @param {string} [message='Payment Required'] - The error message (defaults to standard 402 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.PAYMENT_REQUIRED]) {
    super(message, HttpStatusCodes.PAYMENT_REQUIRED, true);
  }
}

/**
 * Gone error class for 410 HTTP status code.
 * Represents when the requested resource is permanently gone and won't be available again.
 * 
 * @example
 * throw new GoneError('This resource has been permanently deleted');
 * 
 * @class
 * @extends {AppError}
 */
export class GoneError extends AppError {
  /**
   * Creates a GoneError instance.
   * @param {string} [message='Gone'] - The error message (defaults to standard 410 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.GONE]) {
    super(message, HttpStatusCodes.GONE, true);
  }
}

/**
 * Precondition failed error class for 412 HTTP status code.
 * Represents when server rejects request due to precondition headers (e.g., If-Match).
 * 
 * @example
 * throw new PreconditionFailedError('ETag does not match current version');
 * 
 * @class
 * @extends {AppError}
 */
export class PreconditionFailedError extends AppError {
  /**
   * Creates a PreconditionFailedError instance.
   * @param {string} [message='Precondition Failed'] - The error message (defaults to standard 412 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.PRECONDITION_FAILED]) {
    super(message, HttpStatusCodes.PRECONDITION_FAILED, true);
  }
}

/**
 * Not implemented error class for 501 HTTP status code.
 * Represents when the server does not support the functionality required to fulfill the request.
 * 
 * @example
 * throw new NotImplementedError('This feature is not yet implemented');
 * 
 * @class
 * @extends {AppError}
 */
export class NotImplementedError extends AppError {
  /**
   * Creates a NotImplementedError instance.
   * @param {string} [message='Not Implemented'] - The error message (defaults to standard 501 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.NOT_IMPLEMENTED]) {
    super(message, HttpStatusCodes.NOT_IMPLEMENTED, true);
  }
}

/**
 * Bad gateway error class for 502 HTTP status code.
 * Represents when the server received an invalid response from an upstream server.
 * 
 * @example
 * throw new BadGatewayError('Upstream server returned invalid response');
 * 
 * @class
 * @extends {AppError}
 */
export class BadGatewayError extends AppError {
  /**
   * Creates a BadGatewayError instance.
   * @param {string} [message='Bad Gateway'] - The error message (defaults to standard 502 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.BAD_GATEWAY]) {
    super(message, HttpStatusCodes.BAD_GATEWAY, true);
  }
}

/**
 * Service unavailable error class for 503 HTTP status code.
 * Represents when the server is temporarily unable to handle requests (maintenance, overload, etc.).
 * 
 * @example
 * throw new ServiceUnavailableError('Server is under maintenance');
 * 
 * @class
 * @extends {AppError}
 */
export class ServiceUnavailableError extends AppError {
  /**
   * Creates a ServiceUnavailableError instance.
   * @param {string} [message='Service Unavailable'] - The error message (defaults to standard 503 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.SERVICE_UNAVAILABLE]) {
    super(message, HttpStatusCodes.SERVICE_UNAVAILABLE, true);
  }
}

/**
 * Gateway timeout error class for 504 HTTP status code.
 * Represents when an upstream server fails to respond within the timeout period.
 * 
 * @example
 * throw new GatewayTimeoutError('Upstream server did not respond in time');
 * 
 * @class
 * @extends {AppError}
 */
export class GatewayTimeoutError extends AppError {
  /**
   * Creates a GatewayTimeoutError instance.
   * @param {string} [message='Gateway Timeout'] - The error message (defaults to standard 504 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.GATEWAY_TIMEOUT]) {
    super(message, HttpStatusCodes.GATEWAY_TIMEOUT, true);
  }
}

/**
 * Insufficient storage error class for 507 HTTP status code.
 * Represents when the server is unable to store the representation needed to complete the request.
 * 
 * @example
 * throw new InsufficientStorageError('Disk quota exceeded');
 * 
 * @class
 * @extends {AppError}
 */
export class InsufficientStorageError extends AppError {
  /**
   * Creates an InsufficientStorageError instance.
   * @param {string} [message='Insufficient Storage'] - The error message (defaults to standard 507 message)
   */
  constructor(message: string = DefaultStatusMessages[HttpStatusCodes.INSUFFICIENT_STORAGE]) {
    super(message, HttpStatusCodes.INSUFFICIENT_STORAGE, true);
  }
}

/**
 * Processes an error and returns a standardized error response object.
 * If the error is an operational AppError, returns its details.
 * Otherwise, returns a generic 500 Internal Server Error response.
 * 
 * @param {Error | AppError} err - The error to handle
 * @returns {{status: string, statusCode: number, message: string}} Standardized error response object
 * 
 * @example
 * const response = handleError(new NotFoundError('User not found'));
 * // Returns: { status: 'error', statusCode: 404, message: 'User not found' }
 */
export const handleError = (err: Error | AppError) => {
  if (err instanceof AppError && err.isOparational) {
    return {
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      code: err.code,
    };
  }

  return {
    status: "error",
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: DefaultStatusMessages[HttpStatusCodes.INTERNAL_SERVER_ERROR],
    code: getStatusCodeKey(HttpStatusCodes.INTERNAL_SERVER_ERROR),
  };
};

/**
 * Express error handling middleware for catching and responding to errors.
 * This middleware should be placed at the end of all route handlers and middleware.
 * It catches any errors thrown in routes and sends a proper error response.
 * 
 * @param {Error | AppError} err - The error object caught by Express
 * @param {Request} _req - Express request object (unused)
 * @param {Response} res - Express response object
 * @param {NextFunction} _next - Express next function (unused)
 * 
 * @example
 * app.use(globalErrorHandler);
 */
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
    code: errorResponse.code,
    // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
