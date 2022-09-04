module.exports = {
	description: 'Returns a random string between provided strings.',
    usage: 'strings...',
    parameters: [
        {
            name: 'String',
            description: 'The strings.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
	run: async (d, ...strings) => {
		if (strings[0] == undefined) return new d.error('required', d, 'texts')

		return strings[Math.round(Math.random() * (strings.length - 1))]
	}
}