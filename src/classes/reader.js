class reader {
   constructor(data, code, secondary = false) {

      this.result = code;
      this.err = false;

      const readers = {
         default(_this, prefix = "#(", suffix = ")", sep = '|') {
            if (data.err) return;

            if (data.utils.elementValue) {
               _this.result = _this.result.replaceAll(/{#elementvalue}/ig, data.utils.elementValue);
               data.utils.elementValue = undefined;
            };
            if (data.utils.elementName) {
               _this.result = _this.result.replaceAll(/{#elementname}/ig, data.utils.elementName);
               data.utils.elementName = undefined;
            };

            const parts = _this.result.split(prefix).slice(1);

            for(let {} of parts) {
               console.log(_this.result);
               let func = _this.result.split(prefix).slice(1).pop();
               console.log(func);
               if (!func) return;

               let inside = func.split(suffix)[0];
               let params = inside.split(":").slice(1).join(":");
               if (params.startsWith(" ")) params = params.slice(1);
               let funcData = {
                  inside,
                  name: inside.split(":")[0].trim(),
                  params
               };
               data.funcData = funcData;
               data.params = {
                  splits: funcData.params.split(sep),
                  raw: funcData.params,
               };
               if (!inside.includes(":")) data.params = {splits: []};

               let lines = _this.result.split("\n");
               let line = lines.slice(0).reverse().find(line => line.includes(`${prefix}${inside}`.split("\n")[0]));
               data.line = lines.indexOf(line) + 1;
               data.column = lines[data.line - 1].indexOf(`${prefix}${inside}`.split("\n")[0]) + 1;

               // console.log(funcData)

               if (!func.includes(suffix)) return data.error.readerError(data, `Function "${funcData.name}" in ${data.line}:${data.column} is not closed with "${suffix}"`);
               

               let foundFunc = data.loadedFuncs.find(f => f.name.toLowerCase() === funcData.name.toLowerCase());
               if (foundFunc) {
                  foundFunc.run(data);

                  if (data.result == undefined) data.result = "";

                  let replace = _this.result.split(prefix + inside + suffix);
                  let slice = replace.pop();
                  _this.result = replace.join(prefix + inside + suffix) + data.result + slice;

                  if (funcData.name.toLowerCase() === "set") {
                     let [name, value] = data.params.splits;
                     
                     if ([name, value].includes(undefined)) return;
                     
                     _this.result = _this.result.replaceAll(`{${name}}`, data.prots.escape(value));
                  };

                  // console.log({replacer: `${prefix}${inside}>`, result: replace.join(`${prefix}${inside}>`) + data.result + slice, thisResult: _this.result})
               } else {
                  let replace = _this.result.split(prefix + inside + suffix);
                  let slice = replace.pop();
                  _this.result = replace.join(prefix + inside + suffix) + data.prots.escape(`${prefix + inside + suffix}`) + slice;
               };

               data.result = undefined;
            }
         }
      };

      if (!secondary) readers.default(this);
      else readers.default(this, "#?[", "]", '/');

      this.err = data.err;
      this.utils = data.utils;
   }
};

module.exports = reader;