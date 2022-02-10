class reader {
    constructor(data, code) {
        data.exec = {
            result: code
        };

        let importantFunctions = code.split("<!").slice(1).reverse();

        importantFunctions.map(funcData => {
            if (!funcData.includes(">")) return;
            
            let inside = funcData.split(">")[0];
            let func = inside.split(" ")[0];
            let params = inside.split(" ").slice(1).join(" ").trim();

            data.readerData.err = false;
            data.readerData.inside = inside;
            data.readerData.func = func;
            data.readerData.params = {
                raw: params,
                splits: params.split(" ")
            };

            let foundFunc = data.readerData.funcs.find(f => f.name.toLowerCase() === func.toLowerCase());

            if (!foundFunc) return;

            foundFunc.run(data);

            const replaceLast = data.readerData.result.split(`<${inside}>`);
            const slice = replaceLast.pop();
            data.readerData.result = replaceLast.join(`<${inside}>`) + data.readerData.result + slice;
        });

        data.exec.error = data.readerData.err;
    }
}

module.exports = reader;