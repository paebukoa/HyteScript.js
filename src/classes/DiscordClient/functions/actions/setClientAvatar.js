module.exports = {
    description: 'Sets a new avatar to the client user.',
    usage: 'url | isBuffer?',
    parameters: [
        {
            name: 'URL',
            description: 'The avatar URL.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'isBuffer',
            description: 'Whether the URL is a buffer name or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async (d, url, isBuffer = 'false') => {
        if (url == undefined) return new d.error("required", d, 'link')

        if (isBuffer == 'true') {
            let buffer = d.data.buffers[url.toLowerCase()]
            if (buffer == undefined) return new d.error('invalid', d, 'buffer name', url)

            url = buffer
        }

        await d.client.user.setAvatar(url).catch(e => new d.error("custom", d, e.message))
    }
}