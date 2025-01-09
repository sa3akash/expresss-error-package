# error-express

A package to handle all errors in Express applications.

## Installation

```sh
npm install error-express
```

## Usage

```javascript
const express = require('express');
const { globalErrorHandler } = require('error-express');

const app = express();

// Your routes here

// Error handling middleware
app.use(globalErrorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Throwing Custom Errors

You can throw custom errors using the `ServerError` class:

```javascript
import { ServerError } from 'error-express';

app.get('/error', (req, res, next) => {
  next(new ServerError('This is a custom server error', 500));
});

// Example of throwing a custom error
app.get('/some-route', (req, res) => {
    throw new ServerError('Something went wrong!', 400);
});
```


### globalErrorHandler

An Express error-handling middleware that catches errors and sends appropriate responses.

### ServerError

A custom error class for server errors.

#### Constructor

- `message`: The error message.
- `statusCode`: The HTTP status code (default is 500).

### CustomError

An abstract class for creating custom errors. Extend this class to implement your own custom errors.

#### Methods

- **serializeErrors()**: Serializes the error into an object with `message`, `status`, and `statusCode` properties.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

## Contact

For any questions or feedback, please contact [sa2avroo@gmail.com](mailto:sa2avroo@gmail.com).

A package to handle errors in Express applications.

Feel free to adjust any section as needed! This template covers installation, usage, API details, and licensing in a clear and organized manner.

---





