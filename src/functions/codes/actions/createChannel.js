const { parseTime } = require("../../../codings/time");
const { Permissions } = require('discord.js')

module.exports = {
    description: 'Creates a channel.',
    usage: 'name | type? | options? | guildId? | returnId? | reason?',
    parameters: [
        {
            name: 'Name',
            description: 'The channel name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Type',
            description: 'The channel type.',
            optional: 'true',
            defaultValue: 'text'
        },
        {
            name: 'Options',
            description: 'The slash channel options. Read #(newChannel) in HyteScript wikis for detailed explanation.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild to create the channel.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        },
        {
            name: 'Return ID',
            description: 'Whether to return new channel ID or not.',
            optional: 'true',
            defaultValue: 'false'
        },
        {
            name: 'Reason',
            description: 'Reason to be shown in audit logs.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    parseParams: false,
    run: async (d, name, type = "text", options, guildId = d.guild?.id, returnId = 'false', reason) => {
        if (name == undefined) return d.throwError.required(d, 'name')

        if (typeof name === 'object') {
            let parsedname = await name.parse(d)
            if (parsedname.error) return;
            name = parsedname.result
        }

        if (typeof type === 'object') {
            let parsedtype = await type.parse(d)
            if (parsedtype.error) return;
            type = parsedtype.result
        }

        if (typeof guildId === 'object') {
            let parsedguildId = await guildId.parse(d)
            if (parsedguildId.error) return;
            guildId = parsedguildId.result
        }

        if (typeof returnId === 'object') {
            let parsedreturnId = await returnId.parse(d)
            if (parsedreturnId.error) return;
            returnId = parsedreturnId.result
        }

        const channelTypes = {
            text: 'GUILD_TEXT',
            voice: 'GUILD_VOICE',
            news: 'GUILD_NEWS',
            stage: 'GUILD_STAGE_VOICE',
            category: 'GUILD_CATEGORY'
        }

        const getType = channelTypes[type.toLowerCase()]
        if (!getType) return d.throwError.invalid(d, 'channel type', type)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return d.throwError.invalid(d, 'guild ID', guildId)

        const obj = {};

        obj.type = getType
        obj.reason = reason

        if (typeof options === 'object') {
            let optionsData = d.utils.duplicate(d)

            optionsData.functions.set('settopic', {
                parseParams: true,
                run: async (d, topic) => {
                    if (topic == undefined) return d.throwError.required(d, 'topic')

                    obj.topic = topic
                }
            })
            optionsData.functions.set('setnsfw', {
                parseParams: true,
                run: async (d, nsfw = 'true') => {
                    obj.nsfw = nsfw === 'true'
                }
            })  
            optionsData.functions.set('setbitrate', {
                parseParams: true,
                run: async (d, bitrate) => {
                    if (bitrate == undefined) return d.throwError.required(d, 'bitrate')

                    if (obj.type !== 'GUILD_VOICE') return d.throwError.func(d, 'that function can only be used with voice channel type')

                    if (isNaN(bitrate)) return d.throwError.invalid(d, 'bitrate number', bitrate)

                    obj.bitrate = Number(bitrate)
                }
            })
            optionsData.functions.set('setuserlimit', {
                parseParams: true,
                run: async (d, userLimit) => {
                    if (userLimit == undefined) return d.throwError.required(d, 'user limit')

                    if (obj.type !== 'GUILD_VOICE') return d.throwError.func(d, 'that function can only be used with voice channel type')

                    if (isNaN(userLimit) || Number(userLimit) < 0 || Number(userLimit) > 99) return d.throwError.invalid(d, 'user limit number', userLimit)

                    obj.userLimit = Number(userLimit)
                }
            })
            optionsData.functions.set('setposition', {
                parseParams: true,
                run: async (d, position) => {
                    if (position == undefined) return d.throwError.required(d, 'position')

                    if (isNaN(position)) return d.throwError.invalid(d, 'position number', position)

                    obj.position = Number(position)
                }
            })
            optionsData.functions.set('setslowmode', {
                parseParams: true,
                run: async (d, time) => {
                    if (time == undefined) return d.throwError.required(d, 'time')

                    if (obj.type !== 'GUILD_TEXT') return d.throwError.func(d, 'that function can only be used with text channel type')

                    let parsedTime = parseTime(time)
                    if (parsedTime.error) return d.throwError.invalid(d, 'time', time)

                    obj.rateLimitPerUser = parsedTime.ms / 1000
                }
            })
            optionsData.functions.set('setparent', {
                parseParams: true,
                run: async (d, parentId) => {
                    if (parentId == undefined) return d.throwError.required(d, 'parent ID')

                    obj.parent = parentId
                }
            })
            optionsData.functions.set('addpermissions', {
                parseParams: true,
                run: async (d, roleId, ...permissions) => {
                    if (roleId == undefined) return d.throwError.required(d, 'roleId')

                    if (roleId.toLowerCase() === 'everyone') roleId = d.guild?.id

                    if (!obj.permissionOverwrites) obj.permissionOverwrites = []

                    const permObj = {
                        allow: [],
                        deny: []
                    }

                    let id = guild.roles.cache.get(roleId)

                    if (roleId !== d.guild?.id) {
                        if (!id) {
                            id = guild.members.cache.get(roleId)
                            if (!id) return d.throwError.func(d, `invalid ID in "${roleId}":\nMust be a role ID, member ID or "everyone"`)
                        }
                    } else {
                        id = roleId
                    }           

                    const perms = Object.keys(Permissions.FLAGS)

                    for (const permission of permissions) {
                        if (permission.startsWith('+')) {
                            const modPermission = permission.replace('+', '').toUpperCase().replaceAll(' ', '_')

                            if (!perms.includes(modPermission)) return d.throwError.invalid(d, 'permission', permission)

                            permObj.allow.push(modPermission)
                        } else if (permission.startsWith('-')) {
                            const modPermission = permission.replace('-', '').toUpperCase().replaceAll(' ', '_')

                            if (!perms.includes(modPermission)) return d.throwError.invalid(d, 'permission', permission)

                            permObj.deny.push(modPermission)
                        } else return d.throwError.func(d, 'permission need + (allow) or - (deny) in the start (e.g. +view channel).')
                    }

                    obj.permissionOverwrites.push({
                        id,
                        allow: permObj.allow,
                        deny: permObj.deny
                    })
                }
            })

            let wrongFunction = options.functions.find(x => !['settopic', 'setnsfw', 'setbitrate', 'setuserlimit', 'setposition', 'setslowmode', 'addpermissions', 'setparent'].includes(x.name.toLowerCase()))
            if (wrongFunction) return d.throwError.func(d, `#(${wrongFunction.name}) cannot be used in channel builder.`)

            await options.parse(optionsData, true)
            d.error = optionsData.error
            if (d.error) return;
        }

        const newChannel = await guild.channels.create(name, obj).catch(e => {
            return d.throwError.func(d, e.message)
        })

        return returnId === 'true' ? newChannel?.id : undefined
    }
};