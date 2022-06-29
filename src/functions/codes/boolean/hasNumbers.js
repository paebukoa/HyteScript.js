module.exports = {
    description: 'Checks if a string contains numbers and return true or false.',
    usage: 'string',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [str] = d.func.params.splits;

        let includes = false
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        for (const number of numbers) {
            if (str.includes(number)) includes = true
        }

        return includes;
    }
}