module.exports = {
    description: 'Gets an environment variable.',
    usage: 'name',
    parameters: [
        {
            name: 'Name',
            description: 'A valid environment variable name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name) => {
        if (name == undefined) return new d.error('required', d, 'name')
        
        if (!d.data.vars.has(name)) return new d.error('invalid', d, 'variable name', name)
        let varValue = d.data.vars.get(name)
        return varValue
    }
};
