/**
 * HTTP Status Codes constant object.
 * Contains all standard HTTP status codes organized by category:
 * - 1xx: Informational responses
 * - 2xx: Successful responses
 * - 3xx: Redirection messages
 * - 4xx: Client error responses
 * - 5xx: Server error responses
 * 
 * @type {Object}
 * @readonly
 * 
 * @example
 * import { HttpStatusCodes } from './statusCodes';
 * 
 * if (response.statusCode === HttpStatusCodes.NOT_FOUND) {
 *   console.log('Resource not found');
 * }
 */
export const HttpStatusCodes = {
  // 1xx Informational
  /** 100 Continue - Client should continue sending the request body */
  CONTINUE: 100,
  /** 101 Switching Protocols - Server is switching to a different protocol */
  SWITCHING_PROTOCOLS: 101,
  /** 102 Processing - Server received the request and is processing it */
  PROCESSING: 102,
  /** 103 Early Hints - Early hints for preloading resources */
  EARLY_HINTS: 103,

  // 2xx Success
  /** 200 OK - Request succeeded */
  OK: 200,
  /** 201 Created - Request succeeded and a new resource was created */
  CREATED: 201,
  /** 202 Accepted - Request has been accepted for processing but not completed */
  ACCEPTED: 202,
  /** 203 Non-Authoritative Information - Request succeeded but content is from another source */
  NON_AUTHORITATIVE_INFORMATION: 203,
  /** 204 No Content - Request succeeded but there's no content to send */
  NO_CONTENT: 204,
  /** 205 Reset Content - Request succeeded and client should reset the view */
  RESET_CONTENT: 205,
  /** 206 Partial Content - Server sent partial content per range request */
  PARTIAL_CONTENT: 206,
  /** 207 Multi-Status - Response contains multiple status codes */
  MULTI_STATUS: 207,
  /** 208 Already Reported - Members already reported in previous binding */
  ALREADY_REPORTED: 208,
  /** 226 IM Used - Instance manipulation resulted in this representation */
  IM_USED: 226,

  // 3xx Redirection
  /** 300 Multiple Choices - Multiple options available for requested resource */
  MULTIPLE_CHOICES: 300,
  /** 301 Moved Permanently - Resource permanently moved to new URL */
  MOVED_PERMANENTLY: 301,
  /** 302 Found - Resource temporarily moved to different URL */
  FOUND: 302,
  /** 303 See Other - Request should be repeated with different method at specified URL */
  SEE_OTHER: 303,
  /** 304 Not Modified - Resource not modified since last request */
  NOT_MODIFIED: 304,
  /** 305 Use Proxy - Request must be made through proxy */
  USE_PROXY: 305,
  /** 307 Temporary Redirect - Resource temporarily moved, repeat request same method */
  TEMPORARY_REDIRECT: 307,
  /** 308 Permanent Redirect - Resource permanently moved, repeat request same method */
  PERMANENT_REDIRECT: 308,

  // 4xx Client Errors
  /** 400 Bad Request - Request contains malformed syntax or invalid parameters */
  BAD_REQUEST: 400,
  /** 401 Unauthorized - Request requires authentication or invalid credentials */
  UNAUTHORIZED: 401,
  /** 402 Payment Required - Payment required for this resource */
  PAYMENT_REQUIRED: 402,
  /** 403 Forbidden - Client lacks permission to access the resource */
  FORBIDDEN: 403,
  /** 404 Not Found - Server cannot find the requested resource */
  NOT_FOUND: 404,
  /** 405 Method Not Allowed - HTTP method not allowed for this resource */
  METHOD_NOT_ALLOWED: 405,
  /** 406 Not Acceptable - Server cannot produce acceptable response format */
  NOT_ACCEPTABLE: 406,
  /** 407 Proxy Authentication Required - Proxy authentication required */
  PROXY_AUTHENTICATION_REQUIRED: 407,
  /** 408 Request Timeout - Server timed out waiting for request */
  REQUEST_TIMEOUT: 408,
  /** 409 Conflict - Request conflicts with current state of resource */
  CONFLICT: 409,
  /** 410 Gone - Requested resource no longer exists and won't be available again */
  GONE: 410,
  /** 411 Length Required - Request header Content-Length is required */
  LENGTH_REQUIRED: 411,
  /** 412 Precondition Failed - Precondition in request header not satisfied */
  PRECONDITION_FAILED: 412,
  /** 413 Payload Too Large - Request body exceeds maximum allowed size */
  PAYLOAD_TOO_LARGE: 413,
  /** 414 URI Too Long - Request URI exceeds maximum allowed length */
  URI_TOO_LONG: 414,
  /** 415 Unsupported Media Type - Request media type not supported */
  UNSUPPORTED_MEDIA_TYPE: 415,
  /** 416 Range Not Satisfiable - Range request cannot be satisfied */
  RANGE_NOT_SATISFIABLE: 416,
  /** 417 Expectation Failed - Server cannot meet Expect header requirements */
  EXPECTATION_FAILED: 417,
  /** 418 I'm a teapot - Server is a teapot (April Fools' joke) */
  IM_A_TEAPOT: 418,
  /** 421 Misdirected Request - Request sent to server that cannot produce response */
  MISDIRECTED_REQUEST: 421,
  /** 422 Unprocessable Entity - Request semantically incorrect or validation failed */
  UNPROCESSABLE_ENTITY: 422,
  /** 423 Locked - Resource being accessed is locked */
  LOCKED: 423,
  /** 424 Failed Dependency - Request failed due to failure of previous request */
  FAILED_DEPENDENCY: 424,
  /** 425 Too Early - Server unwilling to risk processing prematurely sent request */
  TOO_EARLY: 425,
  /** 426 Upgrade Required - Client should switch to different protocol */
  UPGRADE_REQUIRED: 426,
  /** 428 Precondition Required - Server requires conditional request */
  PRECONDITION_REQUIRED: 428,
  /** 429 Too Many Requests - Client sent too many requests (rate limited) */
  TOO_MANY_REQUESTS: 429,
  /** 431 Request Header Fields Too Large - Request header fields exceed size limit */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  /** 451 Unavailable For Legal Reasons - Resource unavailable for legal reasons */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  // 5xx Server Errors
  /** 500 Internal Server Error - Generic server error */
  INTERNAL_SERVER_ERROR: 500,
  /** 501 Not Implemented - Server does not support requested functionality */
  NOT_IMPLEMENTED: 501,
  /** 502 Bad Gateway - Server received invalid response from upstream server */
  BAD_GATEWAY: 502,
  /** 503 Service Unavailable - Server temporarily unable to handle requests */
  SERVICE_UNAVAILABLE: 503,
  /** 504 Gateway Timeout - Upstream server did not respond in time */
  GATEWAY_TIMEOUT: 504,
  /** 505 HTTP Version Not Supported - Server does not support HTTP version */
  HTTP_VERSION_NOT_SUPPORTED: 505,
  /** 506 Variant Also Negotiates - Server has internal configuration error */
  VARIANT_ALSO_NEGOTIATES: 506,
  /** 507 Insufficient Storage - Server unable to store request data */
  INSUFFICIENT_STORAGE: 507,
  /** 508 Loop Detected - Infinite loop detected in request processing */
  LOOP_DETECTED: 508,
  /** 510 Not Extended - Further extensions required to process request */
  NOT_EXTENDED: 510,
  /** 511 Network Authentication Required - Network authentication required */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

/**
 * Default human-readable HTTP status messages mapped by status code.
 * Provides standard messages for each HTTP status code.
 * Can be used as fallback messages when no custom message is provided.
 * 
 * @type {Object}
 * @readonly
 * 
 * @example
 * import { DefaultStatusMessages, HttpStatusCodes } from './statusCodes';
 * 
 * const message = DefaultStatusMessages[HttpStatusCodes.NOT_FOUND];
 * Result: 'Not Found'
 */
export const DefaultStatusMessages = {
  // 1xx Informational
  [HttpStatusCodes.CONTINUE]: "Continue",
  [HttpStatusCodes.SWITCHING_PROTOCOLS]: "Switching Protocols",
  [HttpStatusCodes.PROCESSING]: "Processing",
  [HttpStatusCodes.EARLY_HINTS]: "Early Hints",

  // 2xx Success
  [HttpStatusCodes.OK]: "OK",
  [HttpStatusCodes.CREATED]: "Created",
  [HttpStatusCodes.ACCEPTED]: "Accepted",
  [HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION]:
    "Non-Authoritative Information",
  [HttpStatusCodes.NO_CONTENT]: "No Content",
  [HttpStatusCodes.RESET_CONTENT]: "Reset Content",
  [HttpStatusCodes.PARTIAL_CONTENT]: "Partial Content",
  [HttpStatusCodes.MULTI_STATUS]: "Multi-Status",
  [HttpStatusCodes.ALREADY_REPORTED]: "Already Reported",
  [HttpStatusCodes.IM_USED]: "IM Used",

  // 3xx Redirection
  [HttpStatusCodes.MULTIPLE_CHOICES]: "Multiple Choices",
  [HttpStatusCodes.MOVED_PERMANENTLY]: "Moved Permanently",
  [HttpStatusCodes.FOUND]: "Found",
  [HttpStatusCodes.SEE_OTHER]: "See Other",
  [HttpStatusCodes.NOT_MODIFIED]: "Not Modified",
  [HttpStatusCodes.USE_PROXY]: "Use Proxy",
  [HttpStatusCodes.TEMPORARY_REDIRECT]: "Temporary Redirect",
  [HttpStatusCodes.PERMANENT_REDIRECT]: "Permanent Redirect",

  // 4xx Client Errors
  [HttpStatusCodes.BAD_REQUEST]: "Bad Request",
  [HttpStatusCodes.UNAUTHORIZED]: "Unauthorized",
  [HttpStatusCodes.PAYMENT_REQUIRED]: "Payment Required",
  [HttpStatusCodes.FORBIDDEN]: "Forbidden",
  [HttpStatusCodes.NOT_FOUND]: "Not Found",
  [HttpStatusCodes.METHOD_NOT_ALLOWED]: "Method Not Allowed",
  [HttpStatusCodes.NOT_ACCEPTABLE]: "Not Acceptable",
  [HttpStatusCodes.PROXY_AUTHENTICATION_REQUIRED]:
    "Proxy Authentication Required",
  [HttpStatusCodes.REQUEST_TIMEOUT]: "Request Timeout",
  [HttpStatusCodes.CONFLICT]: "Conflict",
  [HttpStatusCodes.GONE]: "Gone",
  [HttpStatusCodes.LENGTH_REQUIRED]: "Length Required",
  [HttpStatusCodes.PRECONDITION_FAILED]: "Precondition Failed",
  [HttpStatusCodes.PAYLOAD_TOO_LARGE]: "Payload Too Large",
  [HttpStatusCodes.URI_TOO_LONG]: "URI Too Long",
  [HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE]: "Unsupported Media Type",
  [HttpStatusCodes.RANGE_NOT_SATISFIABLE]: "Range Not Satisfiable",
  [HttpStatusCodes.EXPECTATION_FAILED]: "Expectation Failed",
  [HttpStatusCodes.IM_A_TEAPOT]: "I'm a teapot",
  [HttpStatusCodes.MISDIRECTED_REQUEST]: "Misdirected Request",
  [HttpStatusCodes.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HttpStatusCodes.LOCKED]: "Locked",
  [HttpStatusCodes.FAILED_DEPENDENCY]: "Failed Dependency",
  [HttpStatusCodes.TOO_EARLY]: "Too Early",
  [HttpStatusCodes.UPGRADE_REQUIRED]: "Upgrade Required",
  [HttpStatusCodes.PRECONDITION_REQUIRED]: "Precondition Required",
  [HttpStatusCodes.TOO_MANY_REQUESTS]: "Too Many Requests",
  [HttpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE]:
    "Request Header Fields Too Large",
  [HttpStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS]:
    "Unavailable For Legal Reasons",

  // 5xx Server Errors
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HttpStatusCodes.NOT_IMPLEMENTED]: "Not Implemented",
  [HttpStatusCodes.BAD_GATEWAY]: "Bad Gateway",
  [HttpStatusCodes.SERVICE_UNAVAILABLE]: "Service Unavailable",
  [HttpStatusCodes.GATEWAY_TIMEOUT]: "Gateway Timeout",
  [HttpStatusCodes.HTTP_VERSION_NOT_SUPPORTED]: "HTTP Version Not Supported",
  [HttpStatusCodes.VARIANT_ALSO_NEGOTIATES]: "Variant Also Negotiates",
  [HttpStatusCodes.INSUFFICIENT_STORAGE]: "Insufficient Storage",
  [HttpStatusCodes.LOOP_DETECTED]: "Loop Detected",
  [HttpStatusCodes.NOT_EXTENDED]: "Not Extended",
  [HttpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED]:
    "Network Authentication Required",
} as const;
