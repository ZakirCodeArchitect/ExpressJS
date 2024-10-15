# ExpressJS Core Concepts Project

This repository covers the core concepts of **ExpressJS**, demonstrating the implementation of 5 different types of middleware and their applications in various scenarios.

## Project Overview

This project highlights the following middleware types and provides practical use cases for each:

1. **Application-level Middleware**
2. **Built-in Middleware**
3. **Router-level Middleware**
4. **Third-party Middleware**
5. **Error-handling Middleware**

## Features

### 1. Application-level Middleware
Application-level middleware is applied globally across the app or for specific routes. This middleware is executed before the route handling logic.

Example:
```javascript
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});
## 2. Built-in Middleware

Express provides some built-in middleware to handle common tasks like serving static files and parsing incoming request bodies.

- **`express.json()`**: Parse incoming JSON payloads.
- **`express.urlencoded()`**: Parse URL-encoded payloads (for form submissions).
- **`express.static()`**: Serve static files like HTML, CSS, and JavaScript.

**Example:**

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
## 3. Router-level Middleware

Router-level middleware works similarly to application-level middleware but is bound to specific Express router instances.

**Example:**

```javascript
const router = express.Router();
router.use((req, res, next) => {
    console.log('Router Middleware');
    next();
});
app.use('/api', router);
