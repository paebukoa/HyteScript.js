class reader {
   constructor(data, code) {

      this.result = code;
      this.err = false;

      const readers = {
         default(prefix, _this) {
            if (data.err) return;

            if (data.utils.elementValue) {
               _this.result = _this.result.replace("{#elementValue}", data.utils.elementValue);
               data.utils.elementValue = undefined;
            };
            if (data.utils.elementName) {
               _this.result = _this.result.replace("{#elementName}", data.utils.elementName);
               data.utils.elementName = undefined;
            };

            const parts = _this.result.split(prefix).slice(1);

            for(let {} of parts) {
               let func = _this.result.split(prefix).slice(1).pop();
               if (!func) return;

               let inside = func.split("|>")[0];
               let funcData = {
                  inside: inside,
                  name: inside.split(" ")[0],
                  params: inside.split(" ").slice(1).join(" "),
                  prefix: prefix
               };
               data.funcData = funcData;
               data.params = {
                  splits: funcData.params.split("/"),
                  raw: funcData.params,
               };
               if (!inside.includes(" ")) data.params = {splits: []};

               let lines = _this.result.split("\n");
               let line = lines.slice(0).reverse().find(line => line.includes(`${prefix}${inside}`.split("\n")[0]));
               data.line = lines.indexOf(line) + 1;
               data.column = lines[data.line - 1].indexOf(`${prefix}${inside}`.split("\n")[0]) + 1;

               // console.log(funcData)

               if (!func.includes("|>")) return data.error.readerError(data, `Function ${prefix}${funcData.name}> in ${data.line}:${data.column} is not closed with "|>"`);
               

               let foundFunc = data.loadedFuncs.find(f => f.name.toLowerCase() === funcData.name.toLowerCase());
               if (foundFunc) {
                  foundFunc.run(data);

                  if (data.result == undefined) data.result = "";

                  let replace = _this.result.split(`${prefix}${inside}|>`);
                  let slice = replace.pop();
                  _this.result = replace.join(`${prefix}${inside}|>`) + data.result + slice;

                  if (funcData.name.toLowerCase() === "set") {
                     let [name, value] = data.params.splits;
                     
                     if ([name, value].includes(undefined)) return;
                     
                     _this.result = _this.result.replaceAll(`{${name}}`, data.prots.escape(value));
                  };

                  // console.log({replacer: `${prefix}${inside}>`, result: replace.join(`${prefix}${inside}>`) + data.result + slice, thisResult: _this.result})
               } else {
                  let replace = _this.result.split(`${prefix}${inside}|>`);
                  let slice = replace.pop();
                  _this.result = replace.join(`${prefix}${inside}|>`) + data.prots.escape(`${prefix}${inside}|>`) + slice;
               };

               data.result = undefined;
            }
         }
      };

      readers.default("<|!", this);
      if (!data.err) readers.default("<|", this);

      this.err = data.err;
      this.utils = data.utils;
   }
};

module.exports = reader;