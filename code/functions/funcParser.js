const fs = require("fs");

let functionsFile = fs.readdirSync(__dirname + "/funcs");
let funcs = [];
functionsFile.map(x => {
    let funct = require(__dirname + "/funcs/" + x);
    funcs.push({
        name: x.split(".js")[0],
        run: funct
    });
});
module.exports = funcs;

console.log("Functions loaded.")

