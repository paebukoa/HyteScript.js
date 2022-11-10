module.exports = {
    description: "Encodes a string to URL format.",
    usage: "string",
    parameters: [
        {
            name: 'string',
            description: 'The string to be encoded.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string) => {
        if (string == undefined) return new d.error('required', d, "string", string)
        
        return encodeURIComponent(string);
    }
}