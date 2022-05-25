const fs = require('fs');

class Reader {
    constructor(data) {
        this.data = data;
    };
    
    async default(d, code) {
        async function codeParser(d, code) {            
            if (d.options.debug === true) console.log("\u001b[31mDEBUG\u001b[0m | Reader called");
            let data = {
                reading: 'text',
                code,
                text: [],
                write: '',
                funcReading: {
                    inside: '',
                    tag: '',
                    index: 0,
                    openedInside: false,
                    closedInside: false
                },
                funcs: [],
                funcsReadingCount: 0
            };

            let readTypes = {
                text(character) {
                    if (character === "#") {
                        data.reading = "functionTag";

                        data.funcsReadingCount++;

                        data.funcReading.index = data.text.push(data.write) + data.funcs.length;
                        data.write = '';
                    } else {
                        data.write = data.write.concat(character);
                    };
                },
                functionTag(character) {
                    if (character === "(") {
                        data.reading = "insideFunction";
                        data.funcReading.openedInside = true
                    } else {
                        data.funcReading.tag = data.funcReading.tag.concat(character);
                    };
                },
                insideFunction(character) {
                    if (character === "(") data.funcsReadingCount++;
                    if (character === "|" && data.funcsReadingCount > 1) {
                        data.funcReading.inside = data.funcReading.inside.concat(character.escapeBar())
                    } else if (character === ")") {
                        data.funcsReadingCount--;
                        if (data.funcsReadingCount === 0) {
                            data.reading = "text";

                            data.funcReading.closedInside = true

                            data.funcs.push(data.funcReading)

                            data.funcReading = {
                                inside: '',
                                tag: '',
                                openedInside: false,
                                closedInside: false
                            };
                        } else {
                            data.funcReading.inside = data.funcReading.inside.concat(character);
                        };
                    } else {
                        data.funcReading.inside = data.funcReading.inside.concat(character);
                    };
                },
            };

            if (d.command.enableComments === true && typeof code !== "undefined") code = code.split("\n").map(line => line.split("//")[0]).join("\n");
    
            const codeChars = [...code.replaceAll(`\n`, "").unescapeBar()];

            for (const character of codeChars) {
                let read = readTypes[data.reading];
                if (!read) return;

                read(character);
            };

            if (data.write !== '') {
                data.text.push(data.write);
                data.write = '';
            };
    
            if (data.funcsReadingCount > 0) {
                data.funcs.push(data.funcReading);
    
                data.funcReading = {
                    inside: '',
                    tag: ''
                };
    
                data.funcsReadingCount = 0;
            };
            data.text = data.text.map(x => x.replaceAll("%BR%", "\n"));
    
            return data;
        };

        let parserData = await codeParser(d, code);


        for (const func of parserData.funcs) {
            if (d.options.debug === true) console.log(func);
            if (d.error) return {error: true};

            /* deprecated
            let tags = ['', '!'];
            if (!tags.includes(func.tag)) return d.error.invalid(d, 'function tag', func.tag);
            */

            let funcData = {
                name: func.inside.split(d.options.funcSep)[0].trim(),
                tag: func.tag,
                index: func.index
            };
 
            let args = func.inside.split(d.options.funcSep).slice(1).join(d.options.funcSep);

            if (!func.inside.includes(d.options.funcSep)) {
                args = undefined;
            };
            
            let functionFound = d.loadedFunctions.get(funcData.name.toLowerCase());

            if (functionFound) {
                let funcContent = await fs.readFileSync(functionFound.path).toString();
                
                if (!funcContent.replaceAll(" ", "").toLowerCase().startsWith("//dontparseparams\r\n") && args != undefined) {
                    let readArgs = await this.default(d, args);
                    if (readArgs.error) return;

                    args = readArgs.result;
                    args = args?.split?.("|")?.map?.(arg => arg?.replaceAll?.("%BR%", "\n")?.unescape?.());
                } else {
                    args = args?.split?.("|")
                }
                
                if (args != undefined) {
                    funcData.params = {
                        full: args.join("|"),
                        splits: args
                        .map(x => x.startsWith(" ") && ![" ", "  "].includes(x) ? x.slice(1) : x)
                        .map(x => x.endsWith(" ") && ![" ", "  "].includes(x) ? x.slice(0, x.length - 1) : x)
                        .map(x => x === '' ? undefined : x)
                        .map(x => x === "%BLANK%" ? '' : x)
                    };
                } else {
                    funcData.params = {
                        splits: []
                    };
                };
    
                if (d.options.debug === true) console.log(funcData.params);
    
                d.func = funcData;

                if (!func.closedInside) {
                    d.throwError.func(d, `function is not closed with ")"`)
                    return {error: true}
                }

                let result = await functionFound.run(d).catch?.(error => {
                    d.error = true
                    if (d.options.logErrors) console.error(error)
                    return d.throwError.custom(d, `\`${error} [function #(${d.func.name})]\``) 
                })
                
                if (d.error) return {error: true};
    
                if (result == undefined) result = '';
    
                
                let newText = [];
                let before = parserData.text.slice(0, funcData.index);
                let after = parserData.text.slice(funcData.index, parserData.text.length);
                newText.push(...before, result, ...after);
                
                parserData.text = newText;
            } else {
                let newText = [];
                let before = parserData.text.slice(0, funcData.index);
                let after = parserData.text.slice(funcData.index, parserData.text.length);
                newText.push(...before, `#${func.tag}${func.openedInside ? `(${func.inside}${func.closedInside ? ")" : ""}` : ""}`, ...after);
                
                parserData.text = newText;
            }; 
        };
        
        if (d.options.debug === true) console.log(parserData);
        return {
            result: parserData.text.join(""),
            data: d.data,
            error: d.error
    };

    };
};

module.exports = Reader;