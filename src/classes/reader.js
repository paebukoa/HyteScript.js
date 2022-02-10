class reader {
    constructor(data, code) {
        this.exec.result = code;

        let importantFunctions = code.split("<!").slice(1).reverse();

        importantFunctions.map(funcData => {
            if (!funcData.includes(">")) return;
            
            let inside = funcData.split(">")[0];
            let func = inside.split(" ")[0];
            let params = inside.split(" ").slice(1).join(" ").trim();

            this.data.err = false;
            this.data = data;
            this.data.inside = inside;
            this.data.func = func;
            this.data.params = {
                raw: params,
                splits: params.split(" ")
            };

            let foundFunc = this.data.funcs.find(f => f.name.toLowerCase() === func.toLowerCase());

            if (!foundFunc) return;

            foundFunc.run(this.data);

            const replaceLast = this.exec.result.split(`<${inside}>`);
            const slice = replaceLast.pop();
            this.exec.result = replaceLast.join(`<${inside}>`) + this.data.result + slice;
        });

        this.exec.error = this.data.err;
    }
}

module.exports = reader;