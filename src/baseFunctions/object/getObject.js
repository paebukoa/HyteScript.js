module.exports = {
    description: 'Gets an object.',
    usage: 'name | format?',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Format',
            description: 'Whether to format object or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async (d, name, format = 'false') => {
    if (name == undefined) return new d.error("required", d, 'name')

    if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

    return JSON.stringify(d.data.objects[name], null, format === "true" ? 2 : 0);
}};