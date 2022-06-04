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
        let [array] = d.func.params.splits;

        let isValidArray = true;

        if (array?.startsWith?.("[")) {
            try {
                JSON.parse(array)
            } catch {
                isValidArray = false;
            }
        } else {
            isValidArray = false;
        }
        
        return isValidArray
    }
}