const { get } = require('axios')

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
            description: 'The request headers. Read #(httpsGet) in HyteScript wiki for detailed explanation.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async (d, link, property, headers) => {
        if (link == undefined) return d.throwError.required(d, 'link')

        if (typeof link === 'object') {
            let parsedlink = await link.parse(d)
            if (parsedlink.error) return;
            link = parsedlink.result
        }

        if (typeof property === 'object') {
            let parsedproperty = await property.parse(d)
            if (parsedproperty.error) return;
            property = parsedproperty.result
        }

        if (typeof headers === 'object') {

            let headersData = d.utils.duplicate(d)
            headersData.functions.set('addheader', {
                parseParams: true,
                run: async (d, name, value) => {
                    if (name == undefined) return d.throwError.required(d, 'name')

                    let obj = {}
                    obj[name] = value

                    return obj;
                }
            })
            headersData.functions.set('addheadersbyjson', {
                parseParams: true,
                run: async (d, obj) => {
                    if (obj == undefined) return d.throwError.required(d, 'JSON')

                    try {
                        obj = JSON.parse(obj)
                    } catch (e) {
                        return d.throwError.func(d, e.message)
                    }

                    return obj;
                }
            })

            let wrongFunction = headers.functions.find(x => !['addheader', 'addheadersbyjson'].includes(x.name.toLowerCase()))
            if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in https request headers.`)
            
            let parsedHeaders = await headers.parse(headersData, true)
            d.error = headersData.error
            if (d.error) return;

            let obj = {}
            
            for (const headerObj of parsedHeaders.result) {
                for (const header in headerObj) {
                    if (headerObj.hasOwnProperty.call(headerObj, header)) {
                        const value = headerObj[header]
                        obj[header] = value
                    }
                }
            }

            headers = obj;
        } else {
            headers = {}
        }

        let response = await get(link, { headers }).catch(e => d.throwError.func(d, e.message))
        if (d.error) return;

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