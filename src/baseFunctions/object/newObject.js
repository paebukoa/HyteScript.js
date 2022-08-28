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
            let parsedObject = JSON.parse(object)
            let newObj = {}
                
            for (const key in parsedObject) {
                if (Object.hasOwnProperty.call(parsedObject, key)) {
                    const element = parsedObject[key];
                    newObj[unescape(key)] = typeof element === "string" ? unescape(element) : JSON.stringify(element) 
                }
            }
            
            d.data.objects[name] = newObj
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}