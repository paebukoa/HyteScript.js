class reader {
    constructor(data, code) {

		// early data declaration
        data.exec = {
            result: code
        };
		data.readerData = {};
		data.evalData = {};

		const readers = {
			default(prefix, arr) {
		        arr.map(funcData => {
		            if (!funcData.includes(">") || data.err) return;
					
					// misc
					let codeLines = data.exec.result.split("\n");
					let filteredLines = codeLines.filter(line => line.includes(`${prefix}${funcData}`));
		            
					// fetching func data
		            let inside = funcData.split(">")[0];
		            let func = inside.split(" ")[0];
		            let params = inside.split(" ").slice(1).join(" ").trim();
					let funcLine = codeLines.lastIndexOf(filteredLines.at(-1));
					
					// setting func data
		            data.readerData.inside = inside;
		            data.readerData.func = func;
					data.readerData.funcLine = funcLine;
		            data.params = {
		                raw: params,
		                splits: params.split(" ")
		            };
					
					// validating function
		            let foundFunc = data.loadedFuncs.find(f => f.name.toLowerCase() === func.toLowerCase());
		            if (!foundFunc) return;
					
					// running function
		            foundFunc.run(data);

					if (!data.result) data.result = "";
					
					// replacing function in code
		            const replaceLast = data.exec.result.split(`${prefix}${inside}>`);
		            const slice = replaceLast.pop();
		            data.exec.result = replaceLast.join(`${prefix}${inside}>`) + data.result + slice;

					data.result = undefined;
		        });
			},
		}
		
		// fetching and running important functions
        let importantFunctions = data.exec.result.split("<!").slice(1).reverse();
		readers.default("<!", importantFunctions);
		
		// fetching and running normal functions
		let normalFunctions = data.exec.result.split("<").slice(1).reverse();
		readers.default("<", normalFunctions);

		// setting error
        data.exec.error = data.err;
    }
}

module.exports = reader;