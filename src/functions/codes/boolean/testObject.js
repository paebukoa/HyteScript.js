module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [object] = d.function.parameters;

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