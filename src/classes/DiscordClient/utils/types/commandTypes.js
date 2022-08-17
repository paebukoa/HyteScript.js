let types = {
    _types: {},
    add(name) {
        this._types[name] = new Map()
    }
}

types.add('default')
types.add('alwaysExecute')
types.add('callback')
types.add('interaction')
types.add('commandInteraction')
types.add('buttonInteraction')
types.add('selectMenuInteraction')
types.add('userContextMenuInteraction')
types.add('messageContextMenuInteraction')
types.add('modalSubmitInteraction')
types.add('autocompleteInteraction')
types.add('ready')
types.add('userJoin')
types.add('userLeave')
types.add('clientJoin')
types.add('clientLeave')
types.add('messageDelete')
types.add('messageEdit')
types.add('rateLimit')
types.add('channelCreate')
types.add('channelDelete')
types.add('channelEdit')
types.add('guildBan')

module.exports = types._types