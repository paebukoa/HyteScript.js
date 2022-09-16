const { clone } = require("../../utils/utils")
const { GuildVerificationLevel } = require("discord.js")

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

        if (isNaN(messageCount) || Number(messageCount) <= 0) return new d.error("invalid", d, 'message count', messageCount)

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
                        high: GuildVerificationLevel.High,
                        low: GuildVerificationLevel.Low,
                        medium: GuildVerificationLevel.Medium,
                        veryhigh: GuildVerificationLevel.VeryHigh,
                        none: GuildVerificationLevel.None
                    }

                    editObj.name = name
                }
            })
    }
};