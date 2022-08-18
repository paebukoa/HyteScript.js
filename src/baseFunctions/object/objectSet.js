module.exports = {
    description: 'Sets an object property.',
    usage: 'name | property | value?',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The property to be setted.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Value',
            description: 'The property value.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, property, value) => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (property == undefined) return new d.error("required", d, 'property')

        if (!d.data.objects[name]) return new d.error("invalid", d, 'object name', name);

        d.data.objects[name][property] = value;
    }
};