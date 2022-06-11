const fs = require("fs");
require('./../codings/prototypes')

let loadedFunctions = new Map();

fs.readdirSync(`${__dirname}/codes`).map(functionsDir => {
    fs.readdirSync(`${__dirname}/codes/${functionsDir}`).map(functionName => {
        let functionData = require(`${__dirname}/codes/${functionsDir}/${functionName}`);

        if (!functionName.endsWith('.js')) throw new TypeError(`function loader only supports JS files. "${functionName}" is not a JS file.`)

        let {description, usage, parameters, aliases, parseParams = true, unescapeParams = true, run} = functionData

        if (typeof functionData === 'function') run = functionData;

        loadedFunctions.set(functionName.replaceLast(".js", '').toLowerCase(), {description, usage, parameters, aliases, parseParams, unescapeParams, run, path: `${__dirname}/codes/${functionsDir}/${functionName}`});
    });
});

module.exports = { loadedFunctions };