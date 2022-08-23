module.exports = {
    description: 'Loops a code for provided times.',
    usage: 'times | code',
    parameters: [
        {
            name: 'Times',
            description: 'How many times to execute code.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Code',
            description: 'The code to be executed.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'Characters to separate code execution results.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    dontParse: [1],
    async run (d, times, code, separator = ',') {
        if (times == undefined) return new d.error("required", d, 'times')
        if (code == undefined) return new d.error("required", d, 'code')

        if (isNaN(times) || Number(times) < 0) return new d.error('invalid', d, 'times number', times)

        const results = []
        
        for (let i = 1; i <= times; i++) {
            const parseCode = await code.parse(d)
            if (parseCode.error) return;

            results.push(parseCode.result)
        }
        

        return results.join(separator)
    }
};