const { PermissionsBitField, ChannelType } = require('discord.js');
const { Time, clone, Functions } = require('../../utils/utils');

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
    dontParse: [2],
    run: async (d, name, type = "text", options, guildId = d.guild?.id, returnId = 'false', reason) => {
        if (name == undefined) return new d.error("required", d, 'name')

        const channelTypes = {
            text: ChannelType.GuildText,
            voice: ChannelType.GuildVoice,
            news: ChannelType.GuildNews,
            stage: ChannelType.GuildStageVoice,
            category: ChannelType.GuildCategory
        }

        const getType = channelTypes[type.toLowerCase()]
        if (getType == undefined) return new d.error("invalid", d, 'channel type', type)

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        const obj = {
            type: getType,
            reason,
            name
        };

        if (typeof options === 'object') {
            let optionsData = clone(d)

            optionsData.functions = new Functions(optionsData.functions).set('settopic', { 
                run: async (d, topic) => {
                    if (topic == undefined) return new d.error("required", d, 'topic')

                    obj.topic = topic
                }
            }).set('setnsfw', { 
                run: async (d, nsfw = 'true') => {
                    obj.nsfw = nsfw === 'true'
                }
            }).set('setbitrate', { 
                run: async (d, bitrate) => {
                    if (bitrate == undefined) return new d.error("required", d, 'bitrate')

                    if (obj.type !== 'GUILD_VOICE') return new d.error("custom", d, 'that function can only be used with voice channel type')

                    if (isNaN(bitrate)) return new d.error("invalid", d, 'bitrate number', bitrate)

                    obj.bitrate = Number(bitrate)
                }
            }).set('setuserlimit', { 
                run: async (d, userLimit) => {
                    if (userLimit == undefined) return new d.error("required", d, 'user limit')

                    if (obj.type !== 'GUILD_VOICE') return new d.error("custom", d, 'that function can only be used with voice channel type')

                    if (isNaN(userLimit) || Number(userLimit) < 0 || Number(userLimit) > 99) return new d.error("invalid", d, 'user limit number', userLimit)

                    obj.userLimit = Number(userLimit)
                }
            }).set('setposition', { 
                run: async (d, position) => {
                    if (position == undefined) return new d.error("required", d, 'position')

                    if (isNaN(position)) return new d.error("invalid", d, 'position number', position)

                    obj.position = Number(position)
                }
            }).set('setslowmode', { 
                run: async (d, time) => {
                    if (time == undefined) return new d.error("required", d, 'time')

                    if (obj.type !== 'GUILD_TEXT') return new d.error("custom", d, 'that function can only be used with text channel type')

                    let parsedTime = Time.parse(time)
                    if (parsedTime.error) return new d.error("invalid", d, 'time', time)

                    obj.rateLimitPerUser = parsedTime.ms / 1000
                }
            }).set('setparent', { 
                run: async (d, parentId) => {
                    if (parentId == undefined) return new d.error("required", d, 'parent ID')

                    obj.parent = parentId
                }
            }).set('addpermissions', { 
                run: async (d, roleId, ...permissions) => {
                    if (roleId == undefined) return new d.error("required", d, 'roleId')

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
                            if (!id) return new d.error("custom", d, `invalid ID in "${roleId}": Must be a role ID, member ID or "everyone"`)
                        }
                    } else {
                        id = roleId
                    }           

                    const perms = Object.keys(PermissionsBitField.Flags)

                    for (const permission of permissions) {
                        if (permission.startsWith('+')) {
                            let perm = permission.replace('+', '')
                            if (!perms.includes(perm)) return new d.error("invalid", d, 'permission', perm)

                            permObj.allow.push(perm)
                        } else if (permission.startsWith('-')) {
                            let perm = permission.replace('-', '')
                            if (!perms.includes(perm)) return new d.error("invalid", d, 'permission', perm)

                            permObj.deny.push(perm)
                        } else return new d.error("custom", d, 'permissions must starts with + (allow) or - (deny), e.g. "+ViewChannel".')
                    }

                    obj.permissionOverwrites.push({
                        id,
                        allow: permObj.allow,
                        deny: permObj.deny
                    })
                }
            })

            await options.parse(optionsData, true)
            d.err = optionsData.err
            if (d.err) return;
        }

        const newChannel = await guild.channels.create(obj).catch(e => new d.error("custom", d, e.message))

        return returnId === 'true' ? newChannel?.id : undefined
    }
};