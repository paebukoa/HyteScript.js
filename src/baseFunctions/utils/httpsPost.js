const { post } = require('axios');
const { clone, getDirFiles, replaceLast, BaseFunctions } = require('../../utils/BaseUtils');

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
    dontParse: [2],
    run: async (d, link, property, body) => {
        if (link == undefined) return new d.error("required", d, 'link')

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
            let bodyObj = {}

            const bodyData = clone(d)
                
            bodyData.functions = new BaseFunctions({ getDirFiles, replaceLast, clone }, bodyData.functions).set('addbodyproperty', { 
                async run(d, name, value) {
                    if (name == undefined) return new d.error("required", d, 'name')

                    bodyObj[name] = value
                }
            }).set('addbodypropertiesbyjson', { 
                async run(d, obj) {
                    if (obj == undefined) return new d.error("required", d, 'JSON')
        
                    if (!obj.startsWith('{')) return new d.error("invalid", d, 'JSON', obj)
        
                    try {
                        obj = JSON.parse(obj)
                    } catch (e) {
                        return new d.error("custom", d, e.message)
                    }

                    Object.assign(bodyObj, obj)
                }
            })

            await body.parse(bodyData, true)
            d.err = bodyData.err
            if (d.err) return;

            body = bodyObj
        } else {
            body = {}
        }

        let response = await post(link, body).catch(e => new d.error("custom", d, e.message))
        if (d.err) return;

        let result;

        if (property == undefined) result = response.data;
        else {
            try {
                result = eval(`response.data.${property}`);
            } catch (e) {
                return new d.error("custom", d, `invalid property in "${property}": ${e.message}`)
            }
        }

        return typeof result !== 'string' ? JSON.stringify(result, null, 2) : result
    }
}