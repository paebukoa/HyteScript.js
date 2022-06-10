let types = {
    add(name) {
        this[name] = new Map()
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

module.exports = types