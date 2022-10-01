module.exports = {
    description: 'Creates a buffer.',
    usage: 'name | content',
    parameters: [
        {
            name: 'Name',
            description: 'The variable name to store buffer.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Content',
            description: 'The buffer content.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    async run (d, name, content) {
        if (name == undefined) return new d.error("required", d, 'name')
        if (content == undefined) return new d.error("required", d, 'content')

        d.data.buffers[name.toLowerCase()] = Buffer.from(content, 'utf-8')
    }
};