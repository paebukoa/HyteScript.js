const { AttachmentBuilder } = require("discord.js");

module.exports = {
    description: 'Adds a file to the message.',
    usage: 'name | url | isBuffer? | description? | isSpoiler?',
    parameters: [
        {
            name: 'Name',
            description: 'The file name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'URL',
            description: 'The URL to be added as a file.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'isBuffer',
            description: 'Whether the URL is a buffer name or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Description',
            description: 'The file description.',
            optional: 'false',
            defaultValue: 'none'
        },
    ],
    async run (d, name, url, isBuffer = 'false', description) {
        if (url == undefined) return new d.error("required", d, 'url')

        if (isBuffer == 'true') {
            let buffer = d.data.buffers[url.toLowerCase()]
            if (buffer == undefined) return new d.error('invalid', d, 'buffer name', url)

            url = buffer
        }

        d.data.message.files.push({ attachment: url, name, description })
    }
};