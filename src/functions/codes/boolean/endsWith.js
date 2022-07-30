module.exports = {
	description: 'Checks if a string ends with text.',
    usage: 'string | text',
    parameters: [
        {
            name: 'String',
            description: 'The string to be checked.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Text',
            description: 'The text to check.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
	run: async (d, string, check) => {
		if (string == undefined) return d.throwError.required(d, 'string')
		if (check == undefined) return d.throwError.required(d, 'text')

    return string.endsWith(check);
}}