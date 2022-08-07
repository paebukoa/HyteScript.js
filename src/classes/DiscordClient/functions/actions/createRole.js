const { Permissions } = require('discord.js')

module.exports = {
    description: 'Creates a new in role in a guild.',
    usage: 'name | options? | guildId? | returnId? | reason?',
    parameters: [
        {
            name: 'Name',
            description: 'The role name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Options',
            description: 'The role options. Read #(newRole) in HyteScript wikis for detailed explanation.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild to create the role.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return the new role ID or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    dontParse: [1],
    run: async (d, name, options, guildId = d.guild?.id, returnId = 'false', reason) => {
        if (name == undefined) return d.throwError.required(d, 'name')

        const obj = {};

        obj.name = name
        obj.reason = reason

        if (typeof options === 'object') {
            const optionsData = d.utils.duplicate(d)

            optionsData.functions.set('setcolor', {
                parseParams: true,
                run: async (d, color) => {
                    if (color == undefined) return d.throwError.required(d, 'color')
                    
                    let colors = ["DEFAULT", "WHITE", "AQUA", "GREEN", "BLUE", "YELLOW", "PURPLE", "LUMINOUS_VIVID_PINK", "FUCHSIA", "GOLD", "ORANGE", "RED", "GREY", "NAVY", "DARK_AQUA", "DARK_GREEN", "DARK_BLUE", "DARK_PURPLE", "DARK_VIVID_PINK", "DARK_GOLD", "DARK_ORANGE", "DARK_RED", "DARK_GREY", "DARKER_GREY", "LIGHT_GREY", "DARK_NAVY", "BLURPLE", "GREYPLE", "DARK_BUT_NOT_BLACK", "NOT_QUITE_BLACK", "RANDOM"]

                    if (!/^#[0-9A-F]{6}$/i.test(color) && !colors.includes(color.toUpperCase().replaceAll(' ', '_')) && color !== undefined) return d.throwError.invalid(d, 'color hex', color)
                    
                    obj.color = color
                }
            })
            optionsData.functions.set('sethoist', {
                parseParams: true,
                run: async (d, hoist = 'true') => {
                    obj.hoist = hoist === 'true'
                }
            })
            optionsData.functions.set('setmentionable', {
                parseParams: true,
                run: async (d, mentionable = 'true') => {
                    obj.mentionable = mentionable === 'true'
                }
            })
            optionsData.functions.set('setpermissions', {
                parseParams: true,
                run: async (d, ...permissions) => {
                    if (permissions[0] == undefined) return d.throwError.required(d, 'permissions')

                    const validPerms = Object.keys(Permissions.FLAGS)
                    const perms = []

                    for (const permission of permissions) {
                        let modPerm = permission.toUpperCase().replaceAll(' ', '_')
                        if (!validPerms.includes(modPerm)) return d.throwError.invalid(d, 'permission', permission)

                        perms.push(modPerm)
                    }

                    obj.permissions = perms
                }
            })
            optionsData.functions.set('seticon', {
                parseParams: true,
                run: async (d, icon) => {
                    if (icon == undefined) return d.throwError.required(d, 'icon')

                    obj.icon = icon
                }
            })
            optionsData.functions.set('setposition', {
                parseParams: true,
                run: async (d, position) => {
                    if (position == undefined) return d.throwError.required(d, 'position')

                    if (isNaN(position) || Number(position) < 1) return d.throwError.invalid(d, 'position', position)
                    obj.position = Number(position)
                }
            })

            let wrongFunction = options.functions.find(x => !['setcolor', 'setposition', 'setpermissions', 'seticon', 'setmentionable', 'sethoist'].includes(x.name.toLowerCase()))
            if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in role builder.`)

            await options.parse(optionsData)
            d.error = optionsData.error
            if (d.error) return;
        }

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) d.throwError.invalid(d, 'guild ID', guildId)

        let newRole = await guild.roles.create(obj).catch(e => d.throwError.func(d, e.message))

        return returnId === 'true' ? newRole?.id : undefined
    }
};