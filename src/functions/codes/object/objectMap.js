module.exports = {
    description: 'Runs a code between every object property.',
    usage: 'name | code | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The object name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Code',
            description: 'The code to be executed.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'The characters to separate execution results.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    parseParams: false,
    run: async (d, name, code, sep = ',') => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (code == undefined) return d.throwError.required(d, 'code')

        if (typeof name === 'object') {
            let parsedName = await name.parse(d)
            if (parsedName.error) return;
            name = parsedName.result
        }

        if (typeof sep === 'object') {
            let parsedSep = await sep.parse(d)
            if (parsedSep.error) return;
            sep = parsedSep.result
        }

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

        let mapResult = [];

        for (const property in d.data.objects[name]) {
            let value = d.data.objects[name][property]
            
            let codeData = d.utils.duplicate(d)

            const placeholders = d.data.placeholders.slice(0)

            codeData.data.placeholders.push(
                { name: '{objProperty}', value: property},
                { name: '{objValue}', value}
            )

            const parsedCode = await code.parse(codeData)
            if (parsedCode.error) return;
            
            Object.assign(d.data, codeData.data)
            d.data.placeholders = placeholders

            mapResult.push(parsedCode.result);
        };
        
        return mapResult.join(sep);
    }
};