const { replaceLast } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Replaces a text to another text in a string.',
    usage: 'string | search | replacer | howmany?',
    parameters: [
        {
            name: 'String',
            description: 'String to replace search.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Seach',
            description: 'The text to search in string.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Replacer',
            description: 'The text to replace search in string.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'How many',
            description: 'How many times to replace search to replacer. Can be used "all", which will replace all searchs and negative numbers, which will make it replaces last searchs first.',
            optional: 'true',
            defaultValue: 'all'
        },
    ],
    run: async (d, string, search, replacer, howmany = "all") => {
        if (string == undefined) return new d.error("required", d, `text`)
        if (search == undefined) return new d.error("required", d, `search`)
        if (replacer == undefined) return new d.error("required", d, `replacer`)

        if (isNaN(howmany) && howmany.toLowerCase() !== 'all') return new d.error('invalid', d, 'how many number', howmany)

        let types = {
            all() {
                return string.replaceAll(search, replacer);
            },
            fromStart() {
                let result = string;

                for (let i = 0;i < howmany;i++) {
                    result = result.replace(search, replacer);
                };
    
                return result;
            },
            fromEnd() {
                let result = string;

                for (let i = howmany;i < 0;i++) {
                    result = replaceLast(result, search, replacer);
                };
    
                return result;
            }
        }

        let replace;

        if (howmany.toLowerCase?.() === 'all') replace = types.all
        if (howmany >= 0) replace = types.fromStart
        if (howmany < 0) replace = types.fromEnd

        return replace()
        
    }
};