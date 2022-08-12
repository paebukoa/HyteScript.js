module.exports = {
    description: 'Creates a new object, or overwrites an existing object.',
    usage: 'name | object?',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Object',
            description: 'A valid JSON object.',
            optional: 'true',
            defaultValue: '{}'
        }
    ],
    run: async (d, name, object = '{}') => {
        if (name == undefined) return new d.error("required", d, 'name')

        if (!object.startsWith("{")) return new d.error("invalid", d, "JSON object", object)

        try {
            d.data.objects[name] = JSON.parse(object)
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}