const { clone } = require("../../utils/BaseUtils");

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
    dontParse: [1],
    run: async (d, name, code, separator = ",") => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (code == undefined) return new d.error("required", d, 'code')
        if (separator == undefined) return new d.error("required", d, 'separator')

        if (!d.data.arrays[name]) return new d.error("invalid", d, "array name", name);

        let mapResult = [];

        for (const element of d.data.arrays[name]) {
            let mapData = clone(d)

            const placeholders = d.data.placeholders.slice(0)

            mapData.data.placeholders.push(
                {name: '{arrElement}', value: element}
            )

            const parsedcode = await code.parse(mapData)
            d.err = mapData.err
            if (d.err) return;

            mapResult.push(parsedcode.result)

            Object.assign(d.data, mapData.data)
            d.data.placeholders = placeholders
        };

        return mapResult.join(separator);
    }
};