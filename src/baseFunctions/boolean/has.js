module.exports = {
    description: 'Returns whether a environment variable exists or not.',
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
        if (name == undefined) return new d.error("required", d, 'name')

        return d.data.vars.has(name);
    }
};