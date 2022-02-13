class reader {
   constructor(data, code) {
      // early data declaration
      data.exec = {
      result: code
      };
      data.readerData = {};
      data.evalData = {};
      data.utils = {
         array: {
            default: []
         },
         object: {
            default: []
         },
         vars: [],
      };

      const readers = {
         default(prefix, arr) {
            arr.map(funcData => {
               if (!funcData.includes(">") || data.err) return;

            	// misc
               let codeLines = data.exec.result.split("\n");

            	// fetching func data
               let inside = funcData.split(">")[0];
               let func = inside.split(" ")[0];
               let params = inside.split(" ").slice(1).join(" ").trim();

				// func line and column part
               let filteredLine = codeLines.slice(0).reverse().find(line => line.includes(`${prefix}${inside}>`.split("\n")[0]));
               let funcColumn = data.exec.result.lastIndexOf(`${prefix}${inside}>`) + 1;
               let funcLine = codeLines.lastIndexOf(filteredLine) + 1;

               // setting func data
               data.readerData.inside = inside;
               data.readerData.func = func;
               data.readerData.funcLine = funcLine;
               data.readerData.funcColumn = funcColumn;
               data.params = {
                  raw: params,
                  splits: params.split("/")
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
