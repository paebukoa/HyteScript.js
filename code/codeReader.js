class CodeReader {
    constructor(data, code) {
        let result = code;
        // console.log(code);
        let codeLines;
        const functions = code.split("/");
        functions.slice(1).reverse().map(x => {
            if (this.error) return;
            codeLines = result.split("\n");
            x = result.split("/").pop();
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
            // console.log(`/${func}${inside.inside}`)
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
                    let funcIndex = codeLines.filter(x => x.includes(`/${func}${inside.inside}`));
                    let funcLine = codeLines.indexOf(funcIndex[funcIndex.length - 1]) + 1;
                    console.log(funcLine);
                    console.log(funcIndex);
                    const d = {
                        config: data.config,
                        message: data.message,
                        client: data.client,
                        args: data.args,
                        db: data.db,
                        funcs: data.funcs,
                        inside: inside,
                        error: data.error,
                        func: y.name,
                        command: data.command,
                        commands: data.commands,
                        reader: data.reader,
                        funcLine: funcLine 
                    }
                    
                    try {
                        y.run(d);
                        
                        this.error = d.error.err;

                        let arr = result.split(`/${func}${inside.inside}`);
                        let slice = arr.pop();
                        result = arr.join(`/${func}${inside.inside}`) + d.result + slice;
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