module.exports = async d => {
    let [name, type = "text", position, topic, nsfw = 'false', parentId, guildId = d.guild?.id, returnId = 'false'] = d.func.params.splits;

    if (name === undefined) return d.throwError.func(d, `name is required.`)

    const types = {
        text: 'GUILD_TEXT',
        voice: 'GUILD_VOICE',
        news: 'GUILD_NEWS',
        stage: 'GUILD_STAGE_VOICE',
    }

    const foundType = types[type.toLowerCase()]
    if (!foundType) return d.throwError.invalid(d, 'channel type', type)

    if ((isNaN(position) || Number(position) < 1) && position !== undefined) return d.throwError.invalid(d, 'position', position)

    const parent = d.guild.channels.cache.get(parentId)
    if (!parent && parentId !== undefined) return d.throwError.invalid(d, 'parent ID', parentId)

    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

    const newChannel = await guild.channels.create(name, {
        type: foundType,
        parent,
        position: Number(position),
        nsfw: nsfw === 'true' ? true : false,
        topic
    }).catch(e => {
        return d.throwError.func(d, `failed to create channel: ${e}`)
    })

    return returnId === 'true' ? newChannel.id : undefined
};