module.exports = {
    description: 'Returns a property of a mentioned role.',
    usage: 'index? | property?',
    parameters: [
        {
            name: 'Index',
            description: 'The index of the mentioned role.',
            optional: 'true',
            defaultValue: '1'
        },
        {
            name: 'Property',
            description: 'The role property to be returned.',
            optional: 'true',
            defaultValue: 'ID'
        }
    ],
    run: async d => {
        let [index = '1', property = 'id'] = d.func.params.splits;

        if (isNaN(index) && Number(index) < 1) return d.throwError.invalid(d, 'mentioned role index', index);

        const mentions = [...d.message.mentions.roles.values()];
        const roleData = Number(index) > 0 ? mentions.at(Number(index) - 1) : mentions.at(Number(index)); 

        if (!roleData) return;

        return d.properties.role(roleData, property)
}};