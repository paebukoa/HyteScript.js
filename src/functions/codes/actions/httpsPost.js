const { post } = require('axios')

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
            name: 'Body',
            description: 'The body to be sent in POST request. Read #(httpsPost) in HyteScript wiki for detailed explanation.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    parseParams: false,
    run: async (d, link, property, body) => {
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

        if (typeof body === 'object') {
            const bodyData = d.utils.duplicate(d)
                
            bodyData.functions.set('addbodyproperty', {
                parseParams: true,
                async run(d, name, value) {
                    if (name == undefined) return d.throwError.required(d, 'name')
        
                    const obj = {}
                    obj[name] = value
                    
                    return obj
                }
            })
            bodyData.functions.set('addbodypropertiesbyjson', {
                parseParams: true,
                async run(d, obj) {
                    if (obj == undefined) return d.throwError.required(d, 'JSON')
        
                    if (!obj.startsWith('{')) return d.throwError.invalid(d, 'JSON', obj)
        
                    try {
                        obj = JSON.parse(obj)
                    } catch (e) {
                        return d.throwError.func(d, e.message)
                    }
        
                    return obj
                }
            })
            
            let wrongFunction = body.functions.find(x => !['addbodyproperty', 'addbodypropertiesbyjson'].includes(x.name.toLowerCase()))
            if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in https request body.`)

            let parsedBody = await body.parse(bodyData, true)
            d.error = bodyData.error
            if (d.error) return;

            let obj = {}

            for (const bodyObj of parsedBody.result) {
                for (const body in bodyObj) {
                    if (Object.hasOwnProperty.call(bodyObj, body)) {
                        const value = bodyObj[body]
                        obj[body] = value
                    }
                }
            }

            body = obj
        } else {
            body = {}
        }

        let response = await post(link, body).catch(e => d.throwError.func(d, e.message))
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