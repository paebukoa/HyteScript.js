const fs = require("fs");

let loadedFunctions = new Map();

fs.readdirSync(`${__dirname}/codes`).map(functionsDir => {
    fs.readdirSync(`${__dirname}/codes/${functionsDir}`).map(functionName => {
        let functionData = require(`${__dirname}/codes/${functionsDir}/${functionName}`);

        loadedFunctions.set(functionName.split(".js")[0].toLowerCase(), {run: functionData, path: `${__dirname}/codes/${functionsDir}/${functionName}`});
    });
});

module.exports = { loadedFunctions };