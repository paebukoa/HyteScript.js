const { unescape } = require("../../utils/BaseUtils");

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
    dontUnescape: [1],
    run: async (d, name, object = '{}') => {
        if (name == undefined) return new d.error("required", d, 'name')

        if (!object.startsWith("{")) return new d.error("invalid", d, "JSON object", object)

        try {
            let newObj = {}
                
            for (const key in JSON.parse(object)) {
                if (Object.hasOwnProperty.call(d.data.objects[name], key)) {
                    const element = d.data.objects[name][key];
                    newObj[unescape(key)] = typeof element === "string" ? unescape(element) : JSON.stringify(element) 
                }
            }
            
            d.data.objects[name] = newObj
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}