class reader {
    constructor(data, code) {
        data.exec = {
            result: code
        };

		data.readerData = {};
		data.evalData = {};

		const readers = {

			default(prefix, arr) {
		        arr.map(funcData => {
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
		
		            let foundFunc = data.loadedFuncs.find(f => f.name.toLowerCase() === func.toLowerCase());
		
		            if (!foundFunc) return;
		
		            foundFunc.run(data);
		
		            const replaceLast = data.exec.result.split(`${prefix}${inside}>`);
		            const slice = replaceLast.pop();
		            data.exec.result = replaceLast.join(`${prefix}${inside}>`) + data.result + slice;
		        });
			},

			eval(prefix, arr) {
				
			}
		
	}
		
        let importantFunctions = data.exec.result.split("<!").slice(1).reverse();

		readers.default("<!", importantFunctions);
		
		let normalFunctions = data.exec.result.split("<").slice(1).reverse();

		readers.default("<", normalFunctions);

        data.exec.error = data.readerData.err;
    }
}

module.exports = reader;