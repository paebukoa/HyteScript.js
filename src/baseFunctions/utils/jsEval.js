module.exports = {
    description: 'Runs a JavaScript code. Important note: that function must be used extremely carefully.',
    usage: 'jsCode',
    parameters: [
        {
            name: 'JS code',
            description: 'The JavaScript code to be evaluated.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, jsCode) => {
        if (jsCode == undefined) return new d.error('required', d, 'JS code');

        let evaled = eval(jsCode)
        return typeof evaled == 'string' ? evaled : JSON.stringify(evaled, null, 2);
    }
};