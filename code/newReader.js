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

            // getting data
            let inside = funcLine.split(">")[0];
            let func = inside.split(" ")[0];
            let params = inside.split(" ").slice(1).join(" ");
            if (!params) params = "";
            this.data.params = {
                raw: params,
                splits: params.split("/")
            };

            // checking if function exists
            const foundFunc = this.data.funcs.find(f => f.name.toLowerCase() === func.toLowerCase());

            if (!foundFunc) return;

            // executing function
            foundFunc.run(this.data);

            // replacing function to result in code
            const replaceFunction = this.data.code.executionResult.split(`<${inside}>`);
            console.log(replaceFunction)
            const slice = replaceFunction.pop();
            console.log(slice)
            this.data.code.executionResult = replaceFunction.join(`<${inside}>`) + this.data.result + slice;
            
        }    
    }
}

module.exports = reader; 