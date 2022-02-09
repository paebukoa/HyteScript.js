const fs = require("fs");

let functionsFile = fs.readdirSync(__dirname + "/funcs");
let funcs = [];
functionsFile.map(x => {
    let funct = require(__dirname + "/funcs/" + x);
    funcs.push({
        name: x.split(".").slice(0, x.split(".").length - 1).join("."),
        run: funct
    });
});
funcs.sort((a, b) => {
    return b.name.length - a.name.length;
})
module.exports = funcs;

console.log("Functions loaded.");

