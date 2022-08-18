module.exports = {
    description: 'Checks if a string ends with any of searchs.',
    usage: 'string | search | search...',
    parameters: [
        {
            name: 'String',
            description: 'String to be checked.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Searchs',
            description: 'The text to search in string end.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, ...searchs) => {
        if (string == undefined) return new d.error("required", d, 'string')
        if (searchs[0] == undefined) return new d.error("required", d, 'text')
        
        let endsWith = false;

        for (const search of searchs) {
            if (string.endsWith(search)) endsWith = true;
        }

        return endsWith;
    }
}