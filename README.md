# error-express

Instant error handling for Express.js. Catch errors automatically and respond with clean, consistent JSON errors. **No manual try-catch blocks needed!**

## Why error-express?

Traditional Express error handling is tedious:
- You need to wrap routes in try-catch blocks
- You have to manually call `next(error)`
- You need to handle both sync and async errors
- Every error response needs to be formatted consistently

**error-express handles all of this automatically.** Just throw an error and it's caught, formatted, and sent as JSON.

## Install

```bash
npm install error-express
```

Or use your preferred package manager:

```bash
yarn add error-express
pnpm add error-express
bun add error-express
```

## Quick Start

**1. Add the error handler to your Express app:**

```javascript
const express = require("express");
const { globalErrorHandler, ServerError, HttpStatusCodes } = require("error-express");

const app = express();

// Your routes here
app.get("/api/users", (req, res) => {
  throw new ServerError("Somthing Error.", HttpStatusCodes.BAD_REQUEST);  // custom message and status code

  res.json({ message: "success" });
});

// Add this at the end, after all routes
app.use(globalErrorHandler);

app.listen(3000);
```

**2. Throw errors in your routes (that's it!):**

```javascript
// No try-catch needed!
app.get("/api/users/:id", (req, res, next) => {
  const user = null; // Assume user not found

  if (!user) {
    throw new NotFoundError("User not found");  // custom message
  }

  res.json(user);
});
```

Errors are **automatically caught** and returned as JSON.

## How It Works

error-express wraps your route handlers to automatically catch:
- ✅ Thrown errors (synchronous)
- ✅ Promise rejections (async/await)
- ✅ Callback errors (via `next()`)
- ✅ Unhandled exceptions

All errors are formatted consistently without you writing try-catch.

## Features

- **No Try-Catch Needed**: Automatic error catching in sync and async code
- **Automatic Error Catching**: Catches thrown errors in routes and middleware
- **Consistent JSON Responses**: All errors return a standardized format
- **Custom HTTP Status Codes**: Set the right status code for each error
- **Sync/Async Support**: Works with synchronous and asynchronous code without manual handling
- **Extendable**: Create custom error types by extending `AppError`
- **Clean Code**: Write business logic, not error handling boilerplate
- **20+ Pre-built Error Classes**: Ready-to-use for common HTTP scenarios (400, 401, 404, 429, etc.)
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Custom Error Handlers**: Extend error handling for logging, monitoring, and Sentry integration

## API

### Built-in Error Classes

All error classes come pre-configured with correct HTTP status codes and default messages. Use them directly without manual setup:

#### Client Errors (4xx)

```javascript
// 400 Bad Request
throw new BadRequestError("Invalid input format");

// 401 Unauthorized
throw new UnauthorizedError("Missing authentication token");

// 403 Forbidden
throw new ForbiddenError("You don't have permission");

// 404 Not Found
throw new NotFoundError("Resource not found");

// 405 Method Not Allowed
throw new MethodNotAllowedError();

// 406 Not Acceptable
throw new NotAcceptableError();

// 408 Request Timeout
throw new RequestTimeoutError();

// 409 Conflict
throw new ConflictError("Email already exists");

// 413 Payload Too Large
throw new PayloadTooLargeError("File size exceeds limit");

// 415 Unsupported Media Type
throw new UnsupportedMediaTypeError("Only JSON is accepted");

// 422 Unprocessable Entity
throw new UnprocessableEntityError("Validation failed");

// 429 Too Many Requests
throw new TooManyRequestsError("Rate limit exceeded");

// 402 Payment Required
throw new PaymentRequiredError("Subscription required");

// 410 Gone
throw new GoneError("Resource permanently deleted");

// 412 Precondition Failed
throw new PreconditionFailedError();
```

#### Server Errors (5xx)

```javascript
// 500 Internal Server Error (default)
throw new ServerError("Something went wrong");

// 501 Not Implemented
throw new NotImplementedError("Feature coming soon");

// 502 Bad Gateway
throw new BadGatewayError();

// 503 Service Unavailable
throw new ServiceUnavailableError("Maintenance in progress");

// 504 Gateway Timeout
throw new GatewayTimeoutError();

// 507 Insufficient Storage
throw new InsufficientStorageError();
```

#### Response Format

All errors return a consistent JSON format:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Resource not found"
}
```

### `ServerError` - Custom Status Code

For flexibility, use `ServerError` with any custom status code:

```javascript
throw new ServerError("Something went wrong", HttpStatusCodes.INTERNAL_SERVER_ERROR); // 500
throw new ServerError("Not found", HttpStatusCodes.NOT_FOUND); // 404
throw new ServerError("Invalid input", HttpStatusCodes.BAD_REQUEST); // 400
```

### `AppError` - Base Class

All error classes extend `AppError`. You can also extend it for custom errors:

```javascript
class CustomValidationError extends AppError {
  constructor(message, field) {
    super(message, 400, true);
    this.field = field;
  }
}

throw new CustomValidationError("Invalid email", "email");
```

### `globalErrorHandler`

The middleware that catches and formats all errors. Always add it last:

```javascript
app.use(globalErrorHandler);
```

## Benefits

### 1. **Zero Try-Catch Boilerplate**
Write clean async code without wrapping everything in try-catch:

```javascript
// ❌ Before (verbose)
app.post("/api/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// ✅ After (clean)
app.post("/api/users", async (req, res, next) => {
  const user = await User.create(req.body);
  res.json(user);
});
```

### 2. **Consistent Error Format**
Every error returns the same structure automatically, improving frontend integration.

### 3. **DRY Principle**
Use pre-built error classes instead of creating custom responses:

```javascript
// ✅ One-liner, reusable across your app
throw new NotFoundError("User not found");
throw new UnauthorizedError();
throw new TooManyRequestsError("Rate limited");
```

### 4. **Type Safety**
Full TypeScript support with proper error typing for better IDE autocomplete.

### 5. **Automatic Handling**
All these are caught without manual try-catch:
- ✅ Thrown errors (sync)
- ✅ Promise rejections (async)
- ✅ Callback errors
- ✅ Middleware errors

## Examples

### ❌ Without error-express (Traditional Way)

```javascript
// Manual try-catch, manual next(), manual formatting
app.post("/api/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(new ServerError("Failed to create user", 500));
  }
});
```

### ✅ With error-express (Our Way)

```javascript
// Just throw the error! No try-catch needed
app.post("/api/users", async (req, res, next) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Errors are caught and formatted automatically
```

### Validation Error (No Try-Catch)

```javascript
app.post("/api/signup", (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError("Email is required");
  }

  if (password.length < 6) {
    throw new BadRequestError("Password must be at least 6 characters");
  }

  res.json({ success: true });
});
```

### Async Errors (Automatically Caught)

```javascript
// Even with async, errors are caught automatically!
app.get("/api/data", async (req, res, next) => {
  const data = await fetchFromDatabase(); // If this fails, it's caught
  const parsed = JSON.parse(data); // If this fails, it's caught
  res.json(parsed);
});
```

### Authentication Middleware

```javascript
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError("Missing authentication token");
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }
};

app.get("/api/protected", checkAuth, (req, res) => {
  res.json({ data: "secret", user: req.user });
});
```

### Rate Limiting

```javascript
app.post("/api/login", (req, res, next) => {
  const attempts = getLoginAttempts(req.ip);

  if (attempts > 5) {
    throw new TooManyRequestsError("Too many login attempts. Try again later.");
  }

  // Login logic here
  res.json({ token: "..." });
});
```

### File Upload Validation

```javascript
app.post("/api/upload", (req, res, next) => {
  const fileSize = req.headers["content-length"];

  if (fileSize > 10 * 1024 * 1024) {
    throw new PayloadTooLargeError("File must be under 10MB");
  }

  const contentType = req.headers["content-type"];
  if (!contentType?.includes("application/json")) {
    throw new UnsupportedMediaTypeError("Only JSON is accepted");
  }

  res.json({ success: true });
});
```

## Custom Error Handling

### Create Custom Error Classes

Extend `AppError` for domain-specific errors:

```javascript
import { AppError } from "error-express";

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400, true);
    this.field = field;
  }
}

class DatabaseError extends AppError {
  constructor(message) {
    super(message, 500, true);
  }
}

// Usage
app.post("/api/users", (req, res, next) => {
  if (!req.body.email) {
    throw new ValidationError("Email is required", "email");
  }
  res.json({ success: true });
});
```

### Custom Global Error Handler

Extend the error handler for logging, monitoring, or custom responses:

```javascript
import { handleError, AppError } from "error-express";
import { Request, Response, NextFunction } from "express";

// Custom handler with logging
const customErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse = handleError(err);

  // Log to external service
  console.error({
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  // Send response
  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
    // Add custom fields
    timestamp: new Date().toISOString(),
    path: req.path,
  });
};

app.use(customErrorHandler);
```

### Add Monitoring & Sentry Integration

```javascript
import * as Sentry from "@sentry/node";
import { handleError, AppError } from "error-express";

const monitoredErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Capture in Sentry
  if (err instanceof AppError && !err.isOparational) {
    Sentry.captureException(err);
  }

  const errorResponse = handleError(err);
  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    statusCode: errorResponse.statusCode,
    message: errorResponse.message,
  });
};

app.use(monitoredErrorHandler);
```

## Real-World Example

Complete server with authentication, validation, and error handling:

```javascript
const express = require("express");
const {
  globalErrorHandler,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  TooManyRequestsError,
} = require("error-express");

const app = express();
app.use(express.json());

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new UnauthorizedError();
  req.user = verifyToken(token);
  next();
};

// Rate limiting middleware
const rateLimit = (req, res, next) => {
  if (exceedsRateLimit(req.ip)) {
    throw new TooManyRequestsError("Rate limited");
  }
  next();
};

// Routes - clean and simple!
app.post("/api/users", rateLimit, async (req, res) => {
  if (!req.body.email) throw new BadRequestError("Email required");
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError("User not found");
  res.json(user);
});

app.delete("/api/users/:id", auth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new NotFoundError("User not found");
  res.json({ deleted: true });
});

// Error handling - ONE line!
app.use(globalErrorHandler);

app.listen(3000);
```

## Support

Found a bug? [Open an issue on GitHub](https://github.com/sa3akash/expresss-error-package/issues)

## Author

**Shakil Ahmed** ([@sa3akash](https://github.com/sa3akash))


## License

MIT License - [See LICENSE file](./LICENSE) for details

- GitHub: [sa3akash](https://github.com/sa3akash)
- Repository: [expresss-error-package](https://github.com/sa3akash/expresss-error-package)

