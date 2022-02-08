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
            // setting codeLines
            let codeLines = this.data.code.executionResult.split('\n');

            // getting data
            let inside = funcLine.split(">")[0];
            let func = inside.split(" ")[0];
            let params = inside.split(" ").slice(1).join(" ");
            if (!params) params = "";
            let funcIndex = codeLines.filter(x => x.includes(`<${inside}`)); // get line part
            let line = codeLines.indexOf(funcIndex[funcIndex.length - 1]) + 1;

            // setting data to this.data
            this.data.funcLine = line;
            this.data.func = func;
            this.data.params = {
                raw: params,
                splits: params.split("/")
            };


            // errors
            if (!funcLine.includes(">")) {
                data.error.set.newError(this.data, 'reader', `function ${func} in line ${line} is not closed with ">"`);
                this.data.error.err = true;
                return;
            }

            // checking if function exists
            const foundFunc = this.data.funcs.find(f => f.name.toLowerCase() === func.toLowerCase());

            if (!foundFunc) return;

            // executing function
            foundFunc.run(this.data);

            // replacing function to result in code
            const replaceFunction = this.data.code.executionResult.split(`<${inside}>`);
            // console.log(replaceFunction)
            const slice = replaceFunction.pop();
            // console.log(slice)
            this.data.code.executionResult = replaceFunction.join(`<${inside}>`) + this.data.result + slice;
            
        }
        if (data.config.debug === true) {
            console.log(this.data);
        } 
    }
}

module.exports = reader; 