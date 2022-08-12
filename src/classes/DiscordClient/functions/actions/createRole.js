const { Permissions } = require('discord.js');
const { cloneObject, Functions } = require('../../utils/utils');

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
        if (name == undefined) return new d.error("required", d, 'name')

        const obj = {};

        obj.name = name
        obj.reason = reason

        if (typeof options === 'object') {
            const optionsData = cloneObject(d)

            optionsData.functions = new Functions(optionsData.functions).set('setcolor', { 
                run: async (d, color) => {
                    if (color == undefined) return new d.error("required", d, 'color')
                    
                    let colors = ["DEFAULT", "WHITE", "AQUA", "GREEN", "BLUE", "YELLOW", "PURPLE", "LUMINOUS_VIVID_PINK", "FUCHSIA", "GOLD", "ORANGE", "RED", "GREY", "NAVY", "DARK_AQUA", "DARK_GREEN", "DARK_BLUE", "DARK_PURPLE", "DARK_VIVID_PINK", "DARK_GOLD", "DARK_ORANGE", "DARK_RED", "DARK_GREY", "DARKER_GREY", "LIGHT_GREY", "DARK_NAVY", "BLURPLE", "GREYPLE", "DARK_BUT_NOT_BLACK", "NOT_QUITE_BLACK", "RANDOM"]

                    if (!/^#[0-9A-F]{6}$/i.test(color) && !colors.includes(color.toUpperCase().replaceAll(' ', '_')) && color !== undefined) return new d.error("invalid", d, 'color hex', color)
                    
                    obj.color = color
                }
            }).set('sethoist', { 
                run: async (d, hoist = 'true') => {
                    obj.hoist = hoist === 'true'
                }
            }).set('setmentionable', { 
                run: async (d, mentionable = 'true') => {
                    obj.mentionable = mentionable === 'true'
                }
            }).set('setpermissions', { 
                run: async (d, ...permissions) => {
                    if (permissions[0] == undefined) return new d.error("required", d, 'permissions')

                    const validPerms = Object.keys(Permissions.FLAGS)
                    const perms = []

                    for (const permission of permissions) {
                        let modPerm = permission.toUpperCase().replaceAll(' ', '_')
                        if (!validPerms.includes(modPerm)) return new d.error("invalid", d, 'permission', permission)

                        perms.push(modPerm)
                    }

                    obj.permissions = perms
                }
            }).set('seticon', { 
                run: async (d, icon) => {
                    if (icon == undefined) return new d.error("required", d, 'icon')

                    obj.icon = icon
                }
            }).set('setposition', { 
                run: async (d, position) => {
                    if (position == undefined) return new d.error("required", d, 'position')

                    if (isNaN(position) || Number(position) < 1) return new d.error("invalid", d, 'position', position)
                    obj.position = Number(position)
                }
            })

            await options.parse(optionsData)
            d.err = optionsData.err
            if (d.err) return;
        }

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) new d.error("invalid", d, 'guild ID', guildId)

        let newRole = await guild.roles.create(obj).catch(e => new d.error("custom", d, e.message))

        return returnId === 'true' ? newRole?.id : undefined
    }
};