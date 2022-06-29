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
        let [path, newName] = d.func.params.splits;

        if (path == undefined) return d.throwError.func(d, 'path field is required')

        try {
            fs.renameFileSync(path, newName)
        } catch (e) {
            return d.throwError.func(d, e.message)
        }
    }
}