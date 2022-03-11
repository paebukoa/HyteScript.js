module.exports = async d => {
	let [name, type, parentId, guildId = d.guild?.id, returnId = "false"] = d.params.splits;

	let guild = d.client.guilds.cache.get(guildId);
	if (!guild) return d.error.invalidError(d, "guild ID", guildId);

	let newChannel = guild.channels.cache.create(name, {type, parent: parentId}).catch(e => {return d.error.functionError(d, `failed to create channel: ${e}`)});

	d.result = returnId === "true"? newChannel.id : undefined;
};