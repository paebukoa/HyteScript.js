const { OAuth2Scopes, PermissionsBitField } = require("discord.js")

module.exports = {
    description: 'Returns a role property.',
    usage: 'property | roleId',
    parameters: [
        {
            name: 'Property',
            description: 'The property to get from role.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Role ID',
            description: 'The role which property will be get.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The guild that the role belongs to.',
            optional: 'true',
            defaultValue: 'Current guild ID'
        }
    ],
    run: async (d, ...permissions) => {
        let perms = []
        
        for (let permission of permissions) {
            if (!(permission in PermissionsBitField.Flags)) return new d.error('invalid', d, 'permission', permissions)
            else perms.push(PermissionsBitField.Flags[permission])
        }

        return await d.client.generateInvite({
            scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
            permissions: perms
        })
    }
}