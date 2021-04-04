const express = require("express");
const pastBookRoute = require("./past-book");
const galleryRoute = require("./gallery");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

/**
 * Load swagger UI for documentation view
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PastBook API Documentation",
      version: "0.1.0",
      description:
        "This is a simple CRUD API to save an selected pictures grid.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Pahan",
        url: "https://github.com/pahans",
        email: "pahan123@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3005/api/v1",
      },
    ],
  },
  apis: ["./src/server/routes/api/**/*.js"],
};

const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * Middleware to handle API authentication
 */
router.use(function apiAuth(req, res, next) {
  // TODO: authentication for the API
  next();
});

router.use("/gallery", galleryRoute);
router.use("/past-book", pastBookRoute);

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = router;
