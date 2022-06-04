module.exports = {
    description: 'Tests a hex color and return whether the hex color is valid or not.',
    usage: 'hexColor',
    parameters: [
        {
            name: 'Hex color',
            description: 'The hex color to be tested.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [hex] = d.func.params.splits;

        return /^#[0-9A-F]{6}$/i.test(hex.toUpperCase())
    }
}