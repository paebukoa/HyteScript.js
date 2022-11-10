module.exports = {
    description: "Decodes a URL format string to a normal string.",
    usage: "string",
    parameters: [
        {
            name: 'string',
            description: 'The text to be decoded.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error('required', d, "string", string)
        
        return decodeURIComponent(string);
    }
}