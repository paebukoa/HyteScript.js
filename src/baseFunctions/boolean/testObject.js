module.exports = {
    description: 'Checks if provided object is a valid JS object or not.',
    usage: 'object',
    parameters: [
        {
            name: 'Object',
            description: 'The object to be checked.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, object) => {
        if (object == undefined) return new d.error('required', d, 'object')

        let isValidObject = true;

        if (object?.startsWith?.("{")) {
            try {
                JSON.parse(object)
            } catch {
                isValidObject = false;
            }
        } else {
            isValidObject = false;
        }
        
        return isValidObject
    }
}