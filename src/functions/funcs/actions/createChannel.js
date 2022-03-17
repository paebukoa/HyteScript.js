module.exports = async d => {
	let [name, type, parentId = d.channel?.parentId, guildId = d.guild?.id, returnId = "false"] = d.params.splits;

	let guild = d.client.guilds.cache.get(guildId);
	if (!guild) return d.error.invalidError(d, "guild ID", guildId);

	let channelTypes = {
		text: 'GUILD_TEXT',
		voice: 'GUILD_VOICE'
	};

	let channelType = channelTypes[type.toLowerCase()];
	if(!channelType) return d.error.invalidError(d, `channel type`, type);

	let newChannel = guild.channels.create(name, {type: channelType, parent: parentId}).catch(e => {return d.error.functionError(d, `failed to create channel: ${e}`)});

	d.result = returnId === "true"? newChannel.id : undefined;
};