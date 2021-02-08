const fs = require("fs")
const path = require("path")
const basePath = path.resolve(__dirname)
const baseApiPath = "/api"

exports.boot = function (app) {
    fs.readdirSync(basePath).forEach(function (file) {
        if (file !== "index.js") {
            let module = file.substr(0, file.indexOf("."));
            let filePath = basePath + "/" + module;
            let apiPath = baseApiPath + "/" + module;
            let route = path.resolve(filePath);

            require(route)(app, module, apiPath);
        }
    });
}