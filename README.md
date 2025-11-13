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
const { globalErrorHandler, ServerError } = require("error-express");

const app = express();

// Your routes here
app.get("/api/users", (req, res) => {

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
    throw new ServerError("User not found", 404);
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
- **Extendable**: Create custom error types by extending `CustomError`
- **Clean Code**: Write business logic, not error handling boilerplate

## API

### `ServerError`

Quick way to throw errors with a message and HTTP status code:

```javascript
// 500 status by default
throw new ServerError("Something went wrong");

// Custom status code
throw new ServerError("Not found", 404);
throw new ServerError("Invalid input", 400);
```

Response format:

```json
{
  "message": "Something went wrong",
  "status": "error",
  "statusCode": 500
}
```

### `CustomError` (Advanced)

Create your own error types for specific use cases:

```javascript
class ValidationError extends CustomError {
  status = "validation_error";

  constructor(message) {
    super(message, 400);
  }

  serializeErrors() {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

// Use it
app.post("/api/users", (req, res, next) => {
  if (!req.body.email) {
    return next(new ValidationError("Email is required"));
  }
  res.json({ success: true });
});
```

### `globalErrorHandler`

The middleware that catches all errors. Always add it last:

```javascript
app.use(globalErrorHandler);
```

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
    return next(new ServerError("Email is required", 400));
  }

  if (password.length < 6) {
    return next(new ServerError("Password must be at least 6 characters", 400));
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

### Middleware Error Handling

```javascript
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ServerError("Unauthorized", 401);
  }

  next();
};

app.get("/api/protected", checkAuth, (req, res) => {
  res.json({ data: "secret" });
});
```

### ES Modules

If you're using ES modules:

```javascript
import express from "express";
import { globalErrorHandler, ServerError } from "error-express";

const app = express();

app.get("/api/test", (req, res) => {
  throw new ServerError("Test error", 500);
});

app.use(globalErrorHandler);

app.listen(3000);
```

## Real-World Example

```javascript
const express = require("express");
const { globalErrorHandler, ServerError } = require("error-express");
const app = express();

app.use(express.json());

// Database call - no try-catch needed!
app.post("/api/users", async (req, res, next) => {
  // Errors are caught automatically
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Validation - simple and clean
app.put("/api/users/:id", (req, res, next) => {
  if (!req.params.id) {
    return next(new ServerError("User ID is required", 400));
  }

  const user = User.findById(req.params.id);
  if (!user) {
    return next(new ServerError("User not found", 404));
  }

  res.json(user);
});

// All errors handled automatically with proper status codes and formatting
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

