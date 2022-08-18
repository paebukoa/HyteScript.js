module.exports = {
    description: 'Checks if provided array is a valid JS array or not.',
    usage: 'array',
    parameters: [
        {
            name: 'Array',
            description: 'The array to be checked.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, array) => {
        if (array == undefined) return new d.error('required', d, 'array')

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