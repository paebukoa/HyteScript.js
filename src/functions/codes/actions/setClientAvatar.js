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
        if (link == undefined) return d.throwError.required(d, 'link')

        d.client.user.setAvatar(link)
    }
}