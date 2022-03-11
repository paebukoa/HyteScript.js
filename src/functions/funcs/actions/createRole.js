module.exports = async d => {
	let [name, color = "#FFFFFF", position = "", hoist = "false", mentionable = "false", guildId = d.guild?.id, returnId = "false", ...permissions] = d.params.splits;

	let guild = d.client.guilds.cache.get(guildId);jsjsks
	if (!guild) return d.error.invalidError(d, "guild ID", guildId);

	let newRole = guild.roles.cache.create({
		name, 
		color, 
		position, 
		hoist: hoist === "true"? true : false,
		permissions,
		mentionable
	});

	d.result = returnId === "true"? newRole.id : undefined;
}