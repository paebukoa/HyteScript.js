module.exports = {
    description: 'Executes code between all array elements.',
    usage: 'name | code | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
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
            description: 'Characters to separate code results.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    parseParams: false,
    run: async (d, name, code, separator = ",") => {
        if (name == undefined) return d.throwError.required(d, 'name')
        if (code == undefined) return d.throwError.required(d, 'code')
        if (separator == undefined) return d.throwError.required(d, 'separator')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (typeof separator === 'object') {
            let parsedseparator = await separator.parse(d)
            if (parsedseparator.error) return;
            separator = parsedseparator.result
        }

        if (!d.data.arrays[name]) return d.throwError.invalid(d, "array name", name);

        let mapResult = [];

        for (const element of d.data.arrays[name]) {
            let mapData = d.utils.duplicate(d)

            const placeholders = d.data.placeholders.slice(0)

            mapData.data.placeholders.push(
                {name: '{arrElement}', value: element}
            )

            const parsedcode = await code.parse(mapData)
            d.error = mapData.error
            if (d.error) return;

            mapResult.push(parsedcode.result)

            Object.assign(d.data, mapData.data)
            d.data.placeholders = placeholders
        };

        return mapResult.join(separator);
    }
};