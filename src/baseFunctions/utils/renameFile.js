module.exports = {
    description: 'Renames a file.',
    usage: 'path | newName',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [path, newName] = d.function.parameters;

        if (path == undefined) return new d.error("custom", d, 'path field is required')

        try {
            fs.renameFileSync(path, newName)
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}