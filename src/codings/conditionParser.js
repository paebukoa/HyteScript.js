class conditionParser {
    constructor(data) {
        this.data = data;
    };
    
    parse(d, text) {
        let data = {
            parsing: "partOne",
            one: '',
            symbol: '',
            two: '',
            result: []
        };

        function isComparisonSymbol(char) {
            return [
                "=", 
                "!", 
                ">", 
                "<"
            ].includes(char);
        };

        function isValidFullSymbol(symbol) {
            return [
                "==", 
                "!=", 
                ">",
                "<",
                "<=",
                ">="
            ].includes(symbol);
        };

        let parseTypes = {
            partOne(character) {
                if (isComparisonSymbol(character)) {
                    data.parsing = "symbol";
                    data.symbol = data.symbol.concat(character);
                } else {
                    data.one = data.one.concat(character);
                };
            },
            symbol(character) {
                if (!isComparisonSymbol(character)) {
                    data.parsing = "partTwo";
                    data.two = data.two.concat(character);
                } else {
                    data.symbol = data.symbol.concat(character);
                };
            },
            partTwo(character) {
                data.two = data.two.concat(character);
            }
        };

        let andParts = text.split("&&")
        
        for (const andPart of andParts) {
            let orParts = andPart.split("??")
            let orResult = [];

            for (const orPart of orParts) {
                let characters = [...orPart];
        
                for (const character of characters) {
                    let read = parseTypes[data.parsing];
                    if (!read) return;
        
                    read(character);
                };
        
                if(!isValidFullSymbol(data.symbol)) {
                    let condition = data.one + data.symbol + data.two;
                    let final = true;
                    if (["false", "undefined", "null", ""].includes(condition.trim().toLowerCase())) final = false;
        
                    orResult.push(final)
                } else {
        
                    data.one = data.one
                    .replaceAll("`", "\\`")
                    .replaceAll("$", "\\$")
                    .replaceAll("{", "\\{")
                    .replaceAll("}", "\\}");
            
                    data.two = data.two
                    .replaceAll("`", "\\`")
                    .replaceAll("$", "\\$")
                    .replaceAll("{", "\\{")
                    .replaceAll("}", "\\}");
            
                    if (![" ", "  "].includes(data.one)) {
                        if (data.one.startsWith(" ")) data.one = data.one.replace(" ", "");
                        if (data.one.endsWith(" ")) data.one = data.one.replaceLast(" ", "");
                    }
                    
                    if (![" ", "  "].includes(data.two)) {
                        if (data.two.startsWith(" ")) data.two = data.two.replace(" ", "");
                        if (data.two.endsWith(" ")) data.two = data.two.replaceLast(" ", "");
                    }
                    data.one = !isNaN(data.one) ? Number(data.one) : `\`${data.one.replaceAll("`", "\\`")}\``;
                    data.two = !isNaN(data.two) ? Number(data.two) : `\`${data.two.replaceAll("`", "\\`")}\``;
                    
                    let result = eval(`${data.one} ${data.symbol} ${data.two}`)
        
                    orResult.push(result);
                    
                    data = {
                        parsing: "partOne",
                        one: '',
                        symbol: '',
                        two: '',
                        result: data.result
                    };
                }
            }

            data.result.push(orResult.some(element => element === true)) 
        }

        return data.result.every(element => element === true)
    };
};

module.exports = conditionParser;