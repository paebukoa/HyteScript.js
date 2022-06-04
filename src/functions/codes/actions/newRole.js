module.exports = async d => {
    let [name, color, hoist = 'false', mentionable = 'false', position, guildId = d.guild?.id, returnId = 'false', ...permissions] = d.func.params.splits;

    if (color?.trim?.() === '') color = undefined

    let colors = ["DEFAULT", "WHITE", "AQUA", "GREEN", "BLUE", "YELLOW", "PURPLE", "LUMINOUS_VIVID_PINK", "FUCHSIA", "GOLD", "ORANGE", "RED", "GREY", "NAVY", "DARK_AQUA", "DARK_GREEN", "DARK_BLUE", "DARK_PURPLE", "DARK_VIVID_PINK", "DARK_GOLD", "DARK_ORANGE", "DARK_RED", "DARK_GREY", "DARKER_GREY", "LIGHT_GREY", "DARK_NAVY", "BLURPLE", "GREYPLE", "DARK_BUT_NOT_BLACK", "NOT_QUITE_BLACK", "RANDOM"]

    if (!/^#[0-9A-F]{6}$/i.test(color) && !colors.includes(color.toUpperCase()) && color !== undefined) return d.throwError.invalid(d, 'color', color)

    hoist = hoist === 'true'
    mentionable = mentionable === 'true'
    returnId = returnId === 'true'

    if (position?.trim?.() === '') position = undefined
    if ((isNaN(position) || Number(position) < 1) && position !== undefined) d.throwError.invalid(d, 'position', position)

    if (guildId?.trim?.() === '') guildId = undefined 
    const guild = d.client.guilds.cache.get(guildId)
    if (!guild) d.throwError.invalid(d, 'guild ID', guildId)

    const allPerms = Object.keys(d.djs.Permissions.FLAGS)

    let formatedPermissions;

    if (JSON.stringify(permissions) !== "[]") {
        formatedPermissions = permissions.map(permission => permission.toUpperCase().replaceAll(" ", "_"))

        const permissionsExists = formatedPermissions.every(permission => allPerms.includes(permission))
        if (!permissionsExists) return d.throwError.func(d, `at least one permission is invalid in "${permissions.join(" | ")}"`)
    } else {
        formatedPermissions = undefined
    }

    let newRole = await guild.roles.create({
        name,
        color,
        hoist,
        mentionable,
        position,
        permissions: formatedPermissions
    }).catch(e => {
        return d.throwError.func(d, `failed to create role: ${e}`)
    })

    return returnId ? newRole?.id : undefined
};