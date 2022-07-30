module.exports = {
    description: 'Returns whether a variable exists or not.',
    usage: 'name',
    parameters: [
        {
            name: 'Name',
            description: 'The variable name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name) => {
        if (name == undefined) return d.throwError.required(d, 'name')

        return d.data.vars.has(name);
    }
};