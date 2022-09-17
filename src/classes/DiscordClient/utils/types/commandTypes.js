let types = {
    _types: {},
    add(name) {
        this._types[name] = new Map()
    }
}

// messageCreate/Delete/Edit
types.add('default')
types.add('alwaysExecute')
types.add('messageDelete')
types.add('messageEdit')

// interactionCreate
types.add('interaction')
types.add('commandInteraction')
types.add('buttonInteraction')
types.add('selectMenuInteraction')
types.add('userContextMenuInteraction')
types.add('messageContextMenuInteraction')
types.add('modalSubmitInteraction')
types.add('autocompleteInteraction')

// userJoin/Leave
types.add('userJoin')
types.add('userLeave')

// clientJoin/Leave
types.add('clientJoin')
types.add('clientLeave')

// channelCreate/Delete/Edit
types.add('channelCreate')
types.add('channelDelete')
types.add('channelEdit')

// userBan
types.add('userBan')
types.add('userUnban')

// emojiCreate/Delete/Edit
types.add('emojiCreate')
types.add('emojiDelete')
types.add('emojiEdit')

// eventCreate/Delete/Edit/UserJoin/UserLeave
types.add('eventCreate')
types.add('eventDelete')
types.add('eventEdit')
types.add('eventUserJoin')
types.add('eventUserLeave')

// guildEdit, memberEdit
types.add('guildEdit')
types.add('memberEdit')

// reactionAdd/Remove
types.add('reactionAdd')
types.add('reactionRemove')

// roleCreate/Delete/Edit
types.add('roleCreate')
types.add('roleDelete')
types.add('roleEdit')

// ready, rateLimit
types.add('ready')
types.add('rateLimit')

// extra
types.add('callback')

module.exports = types._types