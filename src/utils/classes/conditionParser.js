module.exports = class ConditionParser {
    constructor(data) {
        this.data = data
    }

    parse(d, text) {
        let parse = {
            type: 'partOne',
            one: '',
            symbol: '',
            two: ''
        }

        let types = {
            partOne(c) {
                if (isComparisonSymbol(c)) {
                    parse.type = 'symbol'
                    parse.symbol += c
                } else {
                    parse.one += c
                }
            },
            symbol(c) {
                if (!isComparisonSymbol(c)) {
                    parse.type = 'partTwo'
                    parse.two += c
                } else {
                    parse.symbol += c
                }
            },
            partTwo(c) {
                parse.two += c
            }
        }

        let ands = text.split('&&')
        let andResults = []

        for (const and of ands) {
            let ors = and.split('??')
            let orResults = []

            for (const or of ors) {
                let chars = [...or]

                for (const c of chars) {
                    const read = types[parse.type]
                    read(c)
                }

                if (!isValidFullSymbol(parse.symbol)) {
                    let final = true
                    if (['!true', 'false', 'undefined', 'null', ''].includes(or.trim().toLowerCase())) final = false

                    orResults.push(final)

                    parse = {
                        type: 'partOne',
                        one: '',
                        symbol: '',
                        two: '',
                        result: []
                    }
                } else {
                    parse.one = parse.one
                    .replaceAll("`", "\\`")
                    .replaceAll("$", "\\$")
                    .replaceAll("{", "\\{")
                    .replaceAll("}", "\\}")
            
                    parse.two = parse.two
                    .replaceAll("`", "\\`")
                    .replaceAll("$", "\\$")
                    .replaceAll("{", "\\{")
                    .replaceAll("}", "\\}")

                    if (![''].includes(parse.one)) {
                        if (parse.one.startsWith(' ')) parse.one = parse.one.replace(' ', '');
                        if (parse.one.endsWith(' ')) parse.one = this.data.replaceLast(parse.one, ' ', '');
                    }
                    if (![''].includes(parse.two)) {
                        if (parse.two.startsWith(' ')) parse.two = parse.two.replace(' ', '');
                        if (parse.two.endsWith(' ')) parse.two = this.data.replaceLast(parse.two, ' ', '');
                    }

                    parse.one = !isNaN(parse.one) ? Number(parse.one) : `\`${parse.one}\``;
                    parse.two = !isNaN(parse.two) ? Number(parse.two) : `\`${parse.two}\``;
                    
                    let parsedCondition = eval(`${parse.one} ${parse.symbol} ${parse.two}`)

                    orResults.push(parsedCondition)
                    
                    parse = {
                        type: 'partOne',
                        one: '',
                        symbol: '',
                        two: '',
                        result: []
                    }
                }
            }

            andResults.push(orResults.some(x => x == true))
        }
     
        return andResults.every(x => x == true)
    }

}

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