const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Fetchs a guild by making a request to Discord API.',
    usage: 'guildId | property?',
    parameters: [
        {
            name: 'guild ID',
            description: 'The guild to be fetched.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The property to be returned if guild exists.',
            optional: 'true',
            defaultValue: 'id'
        }
    ],
    async run(d, guildId, property = 'id') {
        if (guildId == undefined) return new d.error("required", d, 'guild ID')

        let guild = await d.client.guilds.fetch(guildId).catch(() => {});

        if (property.toLowerCase() == 'exists') {
            if (!guild) return false;
            else return true;
        } else if (!guild) return;

        return getProperty('guild', guild, property);
    }
};