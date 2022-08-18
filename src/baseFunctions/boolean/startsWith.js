module.exports = {
    description: 'Checks if a string starts with any of searchs.',
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
            description: 'The text to search in string start.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, ...searchs) => {
        if (searchs[0] == undefined) return new d.error("required", d, 'text')
            
        let startsWith = false;

        for (const search of searchs) {
            if (string.startsWith(search)) startsWith = true;
        }

        return startsWith;
    }
}