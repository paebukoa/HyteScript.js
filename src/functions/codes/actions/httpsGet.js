const axios = require('axios')

module.exports = {
    description: 'Makes http GET request.',
    usage: 'link | property? | header?: name=value | header?...',
    parameters: [
        {
            name: 'Link',
            description: 'The link to make the GET request.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The property to be returned.',
            optional: 'true',
            defaultValue: 'Returns all response data.'
        },
        {
            name: 'Headers',
            description: 'The request headers.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [link, property, ...headers] = d.func.params.splits;
        
        if (link == undefined) return d.throwError.func(d, 'link field is required')

        let parsedHeaders = {};

        for (const header of headers) {
            let [name, value] = header.split('=')

            if (name == undefined || name == '') return d.throwError.func(d, 'header name field is required')

            parsedHeaders[name] = value
        }

        let response = await axios.get(link, {
            headers: parsedHeaders
        })

        let result;

        if (property == undefined) result = response.data;
        else {
            try {
                result = eval(`response.data.${property}`);
            } catch (e) {
                return d.throwError.func(d, `invalid property in "${property}": ${e.message}`)
            }
        }

        return typeof result !== 'string' ? JSON.stringify(result, null, 2) : result
    }
}