# 🚀 **Introducing `error-express`: Your Ultimate Error Handling Solution for Express Applications!** 🚀

Are you tired of messy error handling in your Express apps? Say goodbye to confusion and frustration with **`error-express`**, a powerful NPM package designed to streamline error management in your Express applications.

🚀 **Exciting News for Express Developers!** 🚀

I’m thrilled to introduce **`error-express`**, a powerful NPM package that revolutionizes error handling in your Express applications! 🌟

Are you tired of cluttered error management and want a simple yet effective way to handle errors? Look no further! Here’s why you should try `error-express`:

### 🔑 **Key Features:**

- **Easy Installation**: Just run `npm install error-express` to get started in no time!
- **Global Error Handling**: Use the built-in `globalErrorHandler` middleware to efficiently manage errors across your app, ensuring a smooth user experience.
- **Custom Error Creation**: Throw custom errors with user-friendly messages and appropriate HTTP status codes using the `ServerError` class.
- **Extendable CustomError Class**: Create your own custom error types and ensure consistent error responses that fit your application's needs.
- **Structured Error Serialization**: The `serializeErrors()` method helps serialize error details for consistent and meaningful responses.

## 🌟 **Steps:**

1. **Simple Installation**  
   Get started in a breeze! Just run:

   ```bash
   npm install error-express
   ```

   ```bash
   yarn add error-express
   ```

   ```bash
   pnpm add error-express
   ```

   ```bash
   bun add error-express
   ```

2. **Global Error Handling**  
   Use the built-in `globalErrorHandler` middleware to efficiently catch and respond to errors across your application:

   ```javascript
   const { globalErrorHandler } = require("error-express");
   app.use(globalErrorHandler);
   ```

3. **Custom Error Creation**  
   Easily throw custom errors using the `ServerError` class, allowing for better error messaging and HTTP status handling:

   ```javascript
   next(new ServerError("This is a custom server error", 500));
   ```

4. **Abstract CustomError Class**  
   Extend the `CustomError` class to implement your own custom error types, ensuring consistent error responses:

   ```javascript
   class MyCustomError extends CustomError {
     serializeErrors() {
       return { message: this.message, status: this.statusCode };
     }
   }
   ```

5. **Comprehensive Serialization**  
   The `serializeErrors()` method provides a structured representation of your errors, making it easy to handle responses.

## 📚 **Usage Example:**

#### 🌟 **CommonJS Syntax (CJS)**

If you’re using CommonJS (the default in Node.js), here’s how to set up `error-express` in your app:

```javascript
const express = require("express");
const { globalErrorHandler, ServerError } = require("error-express");

const app = express();

// Your routes here
app.get("/error", (req, res, next) => {
  next(new ServerError("This is a custom server error", 500));
});

// Example of throwing a custom error
app.get("/some-route", (req, res) => {
  throw new ServerError("Something went wrong!", 400);
});

// Error handling middleware
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

#### 🌟 **ES6 Module Syntax (ESM)**

If you prefer using ES6 modules, your setup would look like this:

```javascript
import express from "express";
import { globalErrorHandler, ServerError } from "error-express";

const app = express();

// Your routes here
app.get("/error", (req, res, next) => {
  next(new ServerError("This is a custom server error", 500));
});

// Example of throwing a custom error
app.get("/some-route", (req, res) => {
  throw new ServerError("Something went wrong!", 400);
});

// Error handling middleware
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### ⚠️ **Throwing Custom Errors:**

You can throw custom errors using the `ServerError` class:

```javascript
import { ServerError } from "error-express";

app.get("/error", (req, res, next) => {
  next(new ServerError("This is a custom server error", 500));
});

// Example of throwing a custom error
app.get("/some-route", (req, res) => {
  throw new ServerError("Something went wrong!", 400);
});
```

## 🌈 **Benefits:**

- **Streamlined Error Management**: Keeps your code clean and organized.
- **Improved Developer Experience**: Focus on building features, not handling errors.
- **Customizable Responses**: Tailor error responses to fit your application needs.
- **Community Contributions**: Join the effort! Contribute by submitting issues or pull requests.

### 🌈 **Why Choose `error-express`?**

- **Streamlined Management**: Keep your codebase clean, organized, and easy to maintain.
- **Enhanced Developer Experience**: Spend more time building features and less time debugging errors.
- **Community Driven**: We're open to contributions! Join us by submitting issues or pull requests.

### 📜 **Get Started Today!**

Don’t let error handling be a headache. Try **`error-express`** and take your error management to the next level!

### ⚠️ **globalErrorHandler**:

An Express error-handling middleware that catches errors and sends appropriate responses.

### **ServerError**:

A custom error class for server errors.

#### Constructor

- `message`: The error message.
- `statusCode`: The HTTP status code (default is 500).

### **CustomError**:

An abstract class for creating custom errors. Extend this class to implement your own custom errors.

#### Methods

- **serializeErrors()**: Serializes the error into an object with `message`, `status`, and `statusCode` properties.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgements

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

### 📜 **Licensing**

This project is licensed under the MIT License, ensuring you're free to use and modify it for your projects.

### 🤝 **Get In Touch!**

Have questions or feedback? Reach out at [sa2avroo@gmail.com](mailto:sa2avroo@gmail.com).

---

💡 **Start using `error-express` today and make error handling as seamless as it should be!** 🌍✨

---

Feel free to adjust any section as needed! This template covers installation, usage, API details, and licensing in a clear and organized manner.

---
