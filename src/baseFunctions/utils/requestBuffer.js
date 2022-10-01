const { get } = require("axios")

module.exports = {
    description: '',
    usage: 'name | url | headers? | property? | property of property?...',
    parameters: [
        {
            name: 'Name',
            description: 'The variable which the requested buffer will be stored.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'URL',
            description: 'The URL to request object.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Headers',
            description: 'The request headers for the GET request.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'Gets a property from the requested object.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Property of property...',
            description: 'Gets a property of the previous property, if it\'s an object.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run (d, name, url, headers, ...properties) {
        if (name == undefined) return new d.error('required', d, 'name')
        if (url == undefined) return new d.error("required", d, 'url')

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

        let response = await get(url, { headers }).catch(e => new d.error("custom", d, e.message))
        if (d.err) return;

        let result = response.data;
        if (properties[0] != undefined) {
            for (const property of properties) {
                result = result[property]
            }
        }

        result = Buffer.from(result)
        
        console.log(result)
        
        if (!Buffer.isBuffer(result)) return new d.error('custom', d, 'requested object or property is not a buffer')

        d.data.buffers[name.toLowerCase()] = result
    }
};