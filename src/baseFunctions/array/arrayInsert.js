module.exports = {
    description: 'Appends elements to an array.',
    usage: 'name | element | element?...',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Elements',
            description: 'The elements to append.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, name, index, ...elements) => {
        if (name == undefined) return new d.error("required", d, 'name')
		if (index == undefined) return new d.error("required", d, 'index')
        if (elements[0] == undefined) return new d.error("required", d, 'element')

        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

		if (isNaN(index) || Number(index <= 0)) return new d.error("invalid", d, "index number", index)

        let start = d.data.arrays[name].slice(0, Number(index) - 1)
		let end = d.data.arrays[name].slice(Number(index) - 1, d.data.arrays[name].length)
		
        d.data.arrays[name] = [...start, ...elements, ...end];
    }
};