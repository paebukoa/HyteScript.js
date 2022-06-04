module.exports = {
    description: 'Returns a property of a mentioned channel.',
    usage: 'index? | property?',
    parameters: [
        {
            name: 'Index',
            description: 'The index of the mentioned channel.',
            optional: 'true',
            defaultValue: '1'
        },
        {
            name: 'Property',
            description: 'The channel property to be returned.',
            optional: 'true',
            defaultValue: 'ID'
        }
    ],
    run: async d => {
        let [index = '1', property = 'id'] = d.func.params.splits;

        if (isNaN(index) && Number(index) < 1) return d.throwError.invalid(d, 'mentioned channel index', index);

        const mentions = [...d.message.mentions.channels.values()];
        const channelData = Number(index) > 0 ? mentions.at(Number(index) - 1) : mentions.at(Number(index)); 

        if (!channelData) return;

        return d.properties.channel(channelData, property)
}};