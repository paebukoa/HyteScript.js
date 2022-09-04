module.exports = {
    description: 'Renames a file.',
    usage: 'path | newName',
    parameters: [
        {
            name: 'Path',
            description: 'The file path to rename.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'New name',
            description: 'The new name to replace file\'s name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, path, newName) => {
        if (path == undefined) return new d.error("required", d, 'path')
        if (newName == undefined) return new d.error('required', d, 'newName');

        try {
            fs.renameFileSync(path, newName)
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}