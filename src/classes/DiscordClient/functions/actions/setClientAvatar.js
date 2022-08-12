module.exports = {
    description: 'Sets a new avatar to the client user.',
    usage: 'url',
    parameters: [
        {
            name: 'URL',
            description: 'The avatar URL.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, link) => {
        if (link == undefined) return new d.error("required", d, 'link')

        await d.client.user.setAvatar(link).catch(e => new d.error("custom", d, e.message))
    }
}