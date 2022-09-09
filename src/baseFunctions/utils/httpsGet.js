const { get } = require('axios');
const { clone, BaseFunctions, replaceLast, getDirFiles } = require('../../utils/BaseUtils');

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
    dontParse: [2],
    run: async (d, link, property, headers) => {
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

        if (typeof headers === 'object') {
            let headersObj = {}

            let headersData = clone(d);
            headersData.functions = new BaseFunctions({ getDirFiles, replaceLast, clone }, headersData.functions).set('addheader', { 
                run: async (d, name, value) => {
                    if (name == undefined) return new d.error("required", d, 'name')

                    headersObj[name] = value 

                }
            }).set('addheadersbyjson', { 
                run: async (d, obj) => {
                    if (obj == undefined) return new d.error("required", d, 'JSON')

                    try {
                        obj = JSON.parse(obj)
                    } catch (e) {
                        return new d.error("custom", d, e.message)
                    }

                    Object.assign(headersObj, obj)
                }
            })
            
            await headers.parse(headersData, true)
            d.err = headersData.err
            if (d.err) return;
            d.data = headersData.data

            headers = headersObj;
        } else {
            headers = {}
        }

        let response = await get(link, { headers }).catch(e => new d.error("custom", d, e.message))
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