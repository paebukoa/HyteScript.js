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
            if (this.data.error.err) return;

            // setting codeLines
            let codeLines = this.data.code.executionResult.split('\n');

            // getting data
            let inside = funcLine.split(">")[0];
            let func = inside.split(" ")[0];
            let params = inside.split(" ").slice(1).join(" ");
            if (!params) params = "";
            let funcIndex = codeLines.filter(x => x.includes(`<${inside}`)); // get line part
            let line = codeLines.indexOf(funcIndex.at(-1)) + 1;

            // setting data to this.data
            this.data.funcLine = line;
            this.data.func = func;
            this.data.params = {
                raw: params,
                splits: params.split("/")
            };

			console.log(funcLine)
            // errors
            if (funcLine.includes(">")===false) {
                data.error.set.newError(this.data, 'reader', `function ${func} in line ${line} is not closed with ">"`);
                this.data.error.err = true;
                return;
            }

            // checking if function exists
            const foundFunc = this.data.funcs.find(f => f.name.toLowerCase() === func.toLowerCase());

            if (!foundFunc) return;

            // executing function
            foundFunc.run(this.data);

			if (!this.data.result) this.data.result = "";
			
            // replacing function to result in code
            const replaceFunction = this.data.code.executionResult.split(`<${inside}>`);
            // console.log(replaceFunction)
            const slice = replaceFunction.pop();
			
			console.log({text: this.data.code.executionResult, sample: `<${inside}>`, replaceTo: this.data.result, slice: slice})
			
            this.data.code.executionResult = replaceFunction.join(`<${inside}>`) + this.data.result + slice;

            // logging technical information
            if (data.config.debug) {
                console.log({inside: inside, func: func, params: this.data.params, foundFunc: foundFunc, executionResult: this.data.code.executionResult});
            }
        }
        
    }
}

module.exports = reader; 