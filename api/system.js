module.exports = function (app, module, apiPath) {
    app.get(apiPath + "/ping", (request, response, next) => {
        response.status(200).send({
            status: 200,
            message: "success",
            data: "pong"
        });
    });
};