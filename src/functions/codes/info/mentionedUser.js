module.exports = {
    description: 'Returns a property of a mentioned user.',
    usage: 'index? | property?',
    parameters: [
        {
            name: 'Index',
            description: 'The index of the mentioned user.',
            optional: 'true',
            defaultValue: '1'
        },
        {
            name: 'Property',
            description: 'The user property to be returned.',
            optional: 'true',
            defaultValue: 'ID'
        }
    ],
    run: async d => {
        let [index = '1', property = 'id'] = d.func.params.splits;

        if (isNaN(index) || Number(index) === 0) return d.throwError.invalid(d, 'mentioned user index', index);

        const mentions = [...d.message.mentions.users.values()];
        const userData = Number(index) > 0 ? mentions.at(Number(index) - 1) : mentions.at(Number(index)); 

        if (!userData) return;

        return d.properties.user(userData, property)
}};