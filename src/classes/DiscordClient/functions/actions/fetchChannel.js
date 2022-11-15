const { getProperty } = require("../../utils/utils");

module.exports = {
    description: 'Fetchs a channel by making a request to Discord API.',
    usage: 'channelId | property?',
    parameters: [
        {
            name: 'Channel ID',
            description: 'The channel to be fetched.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Property',
            description: 'The property to be returned if channel exists.',
            optional: 'true',
            defaultValue: 'id'
        }
    ],
    async run(d, channelId, property = 'id') {
        if (channelId == undefined) return new d.error("required", d, 'channel ID')

        let channel = await d.client.channels.fetch(channelId);

        console.log(channel)

        if (property.toLowerCase() == 'exists') {
            if (!channel) return false;
            else return true;
        } else if (!channel) return;

        return getProperty('channel', channel, property);
    }
};