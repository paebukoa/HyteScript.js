const error = require("./errors.js");

class CodeReader {
    constructor(data, code) {
        let result = code;
        // console.log(code);
        const functions = code.split("#");
        functions.slice(1).reverse().map(x => {
            x = result.split("#").pop();
            // console.log(func);
            let func;
            let inside;
            if (x.includes("(")) {
                func = x.split("(")[0];
                if(x.split("(").slice(1).join("(").includes(")")) {
                    inside = {
                        inside: x.split(func)[1].split(")")[0] + ")",
                        splits: x.split("(")[1].split(")")[0].split(",")
                    };
                } else {
                    inside = {
                        inside: x.split(func)[1].split(")")[0],
                        splits: x.split("(")[1].split(")")[0].split(",")
                    };
                }
                //console.log(inside)
            // console.log(`#${func}${inside.inside}`)
            } else {
                inside = {
                    inside: "",
                    splits: [""]
                }
            }
            data.funcs.map(y => {
                if (!x.includes("(")) {
                    func = x.slice(0, y.name.length);
                    //console.log(y.length); 
                }
                if (y.name.toLowerCase() === func.toLowerCase()) {
                    const d = {
                        message: data.message,
                        client: data.client,
                        args: data.args,
                        db: data.db,
                        funcs: data.funcs,
                        inside: inside,
                        error: {
                            set: error,
                            err: false
                        },
                        func: y.name,
                        command: data.command
                    }
                    
                    try {
                        y.run(d);
                        
                        if (d.error.err) return;

                        let arr = result.split(`#${func}${inside.inside}`);
                        let slice = arr.pop();
                        result = arr.join(`#${func}${inside.inside}`) + d.result + slice;
                        // console.log(result);
                    } catch (e) {
                        console.error(e);
                    }
                }
            });
        });
        
        this.result = result;
    }
}

module.exports = { CodeReader };