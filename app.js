// Express
const express = require("express");
const cors = require('cors');
const app = express();
const port = 80;

// API
const api = require("./api");

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerSpecifications = require("./swagger/swagger.json");

// CORS
app.use(cors());

// Load APIs
api.boot(app);

// Express Configuration
app.listen(port);

// Expose Swagger
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpecifications));

// Internal Error Handler
app.use(function (error, request, response, next) {
    response.status(500).send({
        status: 500,
        message: "error",
        data: error.message
    });
});

// Not Found Error Handler
app.use(function (request, response, next) {
    response.status(404).send({
        status: 404,
        message: "error",
        data: "not found"
    });
});