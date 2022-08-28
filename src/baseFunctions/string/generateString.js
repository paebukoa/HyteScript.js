module.exports = {
    description: 'Generates a string with random characters.',
    usage: 'length',
    parameters: [
        {
            name: 'Length',
            description: 'How many characters the generated string must have.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    async run(d, length) {
        let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

        if (isNaN(length) || Number(length) < 1) return new d.error('invalid', d, 'length', length)

        let string = ''

        for (let i = 0 ; i < Number(length) ; i++) {
            string += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        return string;
    }
};