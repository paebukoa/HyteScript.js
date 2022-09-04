module.exports = {
    description: 'Sets a enviroment variable.',
    usage: 'name | value',
    parameters: [
        {
            name: 'Name',
            description: 'The variable name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Value',
            description: 'The value to assigned to variable.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, value) => {
    if (name == undefined) return new d.error("required", d, 'name')

    d.data.vars.set(name, value);
    }
};