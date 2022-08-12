module.exports = {
    description: 'Returns whether a string includes one of texts or not.',
    usage: 'string | text | text...',
    parameters: [
        {
            name: 'String',
            description: 'The string to be checked.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Texts',
            description: 'Texts to check.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, ...searchs) => {
        if (string == undefined) return new d.error("required", d, 'string')
        if (searchs[0] == undefined) return new d.error("required", d, 'text')
        
        let includes = false;

        for (const search of searchs) {
            if (string.includes(search)) includes = true;
        }

        return includes;
    }
};