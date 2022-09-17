const { clone, Time, Functions } = require("../../utils/utils")
const { 
    GuildVerificationLevel, 
    GuildExplicitContentFilter, 
    ChannelType, 
    GuildDefaultMessageNotifications, 
    GuildSystemChannelFlags 
} = require("discord.js")

module.exports = {
    description: 'Edits a guild.',
    usage: 'options | guildId?',
    parameters: [
        {
            name: 'Options',
            description: 'The options for edit guild. Check #(editGuild) in HyteScript Docs for more details.',
            optional: 'true',
            defaultValue: 'Current channel ID'
        },
        {
            name: 'Guild ID',
            description: 'The guild which the channel belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    dontParse: [0],
    run: async (d, options, guildId = d.guild?.id) => {
        if (options == undefined) return new d.error("required", d, 'options')

        const guild = d.client.guilds.cache.get(guildId)
        if (!guild) return new d.error("invalid", d, 'guild ID', guildId)

        let editObj = {

        }

        let optionsData = clone(d)
        optionsData.functions = new Functions(optionsData.functions)
            .set('setName', {
                async run(d, name) {
                    if (name == undefined) return new d.error('required', d, 'name')

                    editObj.name = name
                }
            })
            .set('setVerificationLevel', {
                async run(d, type) {
                    if (type == undefined) return new d.error('required', d, 'type')

                    let types = {
                        none: GuildVerificationLevel.None,
                        low: GuildVerificationLevel.Low,
                        medium: GuildVerificationLevel.Medium,
                        high: GuildVerificationLevel.High,
                        highest: GuildVerificationLevel.VeryHigh
                    }

                    if (!(type.toLowerCase() in types)) return new d.error('invalid', d, 'type', type)

                    editObj.verificationLevel = types[type.toLowerCase()]
                }
            })
            .set('setExplicitContentFilter', {
                async run(d, type) {
                    if (type == undefined) return new d.error('required', d, 'type')

                    let types = {
                        allmembers: GuildExplicitContentFilter.AllMembers,
                        disabled: GuildExplicitContentFilter.Disabled,
                        memberswithoutroles: GuildExplicitContentFilter.MembersWithoutRoles
                    }

                    if (!(type.toLowerCase() in types)) return new d.error('invalid', d, 'type', type)

                    editObj.explicitContentFilter = types[type.toLowerCase()]
                }
            })
            .set('setAFKChannel', {
                async run(d, channelId = d.channel?.id, guildId = d.guild?.id) {
                    const guild = d.client.guilds.cache.get(guildId)
                    if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

                    const channel = guild.channels.cache.get(channelId)
                    if (!channel) return new d.error('invalid', d, 'channel ID', channelId)
                    if (channel.type !== ChannelType.GuildVoice) return new d.error('custom', d, `provided channel "${channelId}" is not a voice channel`)

                    editObj.afkChannel = channel
                }
            })
            .set('setSystemChannel', {
                async run(d, channelId = d.channel?.id, guildId = d.guild?.id) {
                    const guild = d.client.guilds.cache.get(guildId)
                    if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

                    const channel = guild.channels.cache.get(channelId)
                    if (!channel) return new d.error('invalid', d, 'channel ID', channelId)
                    if (channel.type !== ChannelType.GuildText) return new d.error('custom', d, `provided channel "${channelId}" is not a text channel`)

                    editObj.systemChannel = channel
                }
            })
            .set('setAFKTimeout', {
                async run(d, time) {
                    if (time == undefined) return new d.error('required', d, 'time')

                    const parsedTime = Time.parseTime(time)
                    if (parsedTime.error) return new d.error('invalid', d, 'time', time)

                    editObj.afkTimeout = parsedTime.ms
                }
            })
            .set('setIcon', {
                async run(d, url) {
                    if (url == undefined) return new d.error('required', d, 'URL')

                    editObj.icon = url
                }
            })
            .set('setInviteBanner', {
                async run(d, url) {
                    if (url == undefined) return new d.error('required', d, 'URL')

                    editObj.splash = url
                }
            })
            .set('setDiscoveryBanner', {
                async run(d, url) {
                    if (url == undefined) return new d.error('required', d, 'URL')

                    editObj.discoverySplash = url
                }
            })
            .set('setBanner', {
                async run(d, url) {
                    if (url == undefined) return new d.error('required', d, 'URL')

                    editObj.banner = url
                }
            })
            .set('setDefaultMessageNotification', {
                async run(d, type) {
                    if (type == undefined) return new d.error('required', d, 'type')

                    let types = {
                        allmembers: GuildDefaultMessageNotifications.AllMessage,
                        disabled: GuildDefaultMessageNotifications.OnlyMentions
                    }

                    if (!(type.toLowerCase() in types)) return new d.error('invalid', d, 'type', type)

                    editObj.defaultMessageNotifications = types[type.toLowerCase()]
                }
            })
            .set('setSystemChannelFlags', {
                async run(d, ...flags) {
                    if (flags[0] == undefined) return new d.error('required', d, 'flags')

                    let flagsTypes = {
                        suppresssetuptips: GuildSystemChannelFlags.SuppressGuildReminderNotifications,
                        hidejoinmessagestickerbutton: GuildSystemChannelFlags.SuppressJoinNotificationReplies,
                        suppressmemberjoin: GuildSystemChannelFlags.SuppressJoinNotifications,
                        suppressboostmessages: GuildSystemChannelFlags.SuppressPremiumSubscriptions
                    }

                    editObj.systemChannelFlags = []

                    for (const flag of flagsTypes) {
                        if (!(flag.toLowerCase() in flags)) return new d.error('invalid', d, 'flag', flag)

                        editObj.systemChannelFlags.push(flagsTypes[type.toLowerCase()])
                    }
                }
            })
            .set('setRulesChannel', {
                async run(d, channelId = d.channel?.id, guildId = d.guild?.id) {
                    const guild = d.client.guilds.cache.get(guildId)
                    if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

                    const channel = guild.channels.cache.get(channelId)
                    if (!channel) return new d.error('invalid', d, 'channel ID', channelId)
                    if (channel.type !== ChannelType.GuildText) return new d.error('custom', d, `provided channel "${channelId}" is not a text channel`)

                    editObj.rulesChannel = channel
                }
            })
            .set('setCommunityUpdatesChannel', {
                async run(d, channelId = d.channel?.id, guildId = d.guild?.id) {
                    const guild = d.client.guilds.cache.get(guildId)
                    if (!guild) return new d.error('invalid', d, 'guild ID', guildId)

                    const channel = guild.channels.cache.get(channelId)
                    if (!channel) return new d.error('invalid', d, 'channel ID', channelId)
                    if (channel.type !== ChannelType.GuildText) return new d.error('custom', d, `provided channel "${channelId}" is not a text channel`)

                    editObj.publicUpdatesChannel = channel
                }
            })
            .set('setBoostsProgressBar', {
                async run(d, enabled = 'true') {
                    if (enabled == undefined) return new d.error('required', d, 'enabled')

                    editObj.enabled = enabled === 'true'
                }
            })
            .set('setDescription', {
                async run(d, description) {
                    if (description == undefined) return new d.error('required', d, 'description')

                    editObj.description = description
                }
            })
            .set('setReason', {
                async run(d, reason) {
                    if (reason == undefined) return new d.error('required', d, 'reason')

                    editObj.reason = reason
                }
            })

            await options.parse(optionsData)
            d.err = optionsData.err
            if (d.err) return;
            d.data = optionsData.data

            await guild.edit(editObj).catch(e => new d.error('custom', d, e.message))
    }
};