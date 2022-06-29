module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async d => {
        let [code] = d.func.params.splits;

        let parseCode = await d.reader.default(d, code)
        if (parseCode?.error) return;

        code = parseCode.result;

        let evaled = await d.reader.default(d, code);
        if (evaled?.error) return;

        return evaled.result;
    }
}