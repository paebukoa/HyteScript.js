module.exports = {
    description: 'Deletes an enviroment variable.',
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
        if (name == undefined) return new d.error('required', d, 'name');

        if (!d.data.vars.has(name)) return new d.error('invalid', d, 'variable name', name)

        d.data.vars.delete(name);
}};