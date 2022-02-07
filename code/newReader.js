class reader {
    constructor(data, code) {

        this.data = data;
        this.data.splits = [];
        this.data.vars = {};
        this.data.embeds = [];
        this.data.result = "";
        this.data.code = {
            code: code,
            codeLines: code.split("\n"),
            executionResult: code
        };

        const findFuncs = code.split("<").slice(1).reverse();

        for (const funcLine of findFuncs) {

            let inside = funcLine.split(">")[0];
            let func = inside.split(" ")[0];
            let params = inside.split(" ").slice(1).join(" ");
            if (!params) params = "";

            this.data.params = {
                raw: params,
                splits: params.split("/")
            };

            const foundFunc = this.data.funcs.find(f => f.name.toLowerCase() === func.toLowerCase());

            foundFunc.run(this.data);

            const replaceFunction = this.data.code.executionResult.split(`<${func} ${params}>`);
            const slice = replaceFunction.pop();
            this.data.code.executionResult = replaceFunction.join(`<${func} ${params}>`);
        }    
    }
}

module.exports = reader;