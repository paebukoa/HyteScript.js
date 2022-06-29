const axios = require('axios')

module.exports = {
    description: 'Makes http POST request.',
    usage: 'link | property? | data: JSON object or "name=value" | data...',
    parameters: [
        {
            name: 'Link',
            description: 'The link to make POST request.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The response property to be returned.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Datas',
            description: 'The data to be sent in POST request.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [link, property, ...datas] = d.func.params.splits;

        let body = {};

        for (const data of datas) {
            try {
                let parsedData = JSON.parse(data)
                Object.assign(body, parsedData)
            } catch (e) {
                if (!data.includes('=')) return d.throwError.func(d, `invalid JSON in "${data}": ${e.message}`)
                const [name, value] = data.split('=')

                if (name == undefined || name == '') return d.throwError.func(d, 'data name field is required')

                body[name] = value
            }
        }

        let response = await axios.post(link, body)

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