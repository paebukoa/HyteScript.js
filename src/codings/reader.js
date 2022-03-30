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
                    index: 0
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

                            data.funcs.push(data.funcReading)

                            data.funcReading = {
                                inside: '',
                                tag: ''
                            };
                        } else {
                            data.funcReading.inside = data.funcReading.inside.concat(character);
                        };
                    } else {
                        data.funcReading.inside = data.funcReading.inside.concat(character);
                    };
                },
            };
    
            const codeChars = [...code.replaceAll(`\n`, "").replaceAll("%BR%", `\n`).unescapeBar()];

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
                name: func.inside.split("=>")[0].trim(),
                tag: func.tag,
                index: func.index
            };
 
            let args = func.inside.split("=>").slice(1).join("=>");

            if (!func.inside.includes("=>")) {
                args = undefined;
            };
            
            let functionFound = d.loadedFunctions.get(funcData.name.toLowerCase());
            if (functionFound) {
                let funcContent = await fs.readFileSync(functionFound.path).toString();
                
                if (!funcContent.replaceAll(" ", "").toLowerCase().startsWith("//dontparseparams\r\n") && args != undefined) {
                    let readArgs = await this.default(d, args);
                    args = readArgs.result;
                };
                
                if (args != undefined && typeof args === "string") {
                    funcData.params = {
                        full: args,
                        splits: args.split("|")
                        .map(x => x.startsWith(" ") && ![" ", "  "].includes(x) ? x.slice(1) : x)
                        .map(x => x.endsWith(" ") && ![" ", "  "].includes(x) ? x.slice(0, [...x].length - 1) : x)
                    };
                } else {
                    funcData.params = {
                        splits: []
                    };
                };
    
                if (d.options.debug === true) console.log(funcData.params);
    
                d.func = funcData;
    
                let result = await functionFound.run(d);
    
                if (result == undefined) result = '';
    
                if (d.error) return {error: true};
                
                let newText = [];
                let before = parserData.text.slice(0, funcData.index);
                let after = parserData.text.slice(funcData.index, parserData.text.length);
                newText.push(...before, result, ...after);
                
                parserData.text = newText;
            } else {
                let newText = [];
                let before = parserData.text.slice(0, funcData.index);
                let after = parserData.text.slice(funcData.index, parserData.text.length);
                newText.push(...before, `#${func.tag}(${func.inside})`, ...after);
                
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