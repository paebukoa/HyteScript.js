module.exports = async d => {
    let [userId = d.author?.id, guildId = d.guild?.id, reason] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId);
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId);

    guild.members.unban(userId, reason).catch(e => d.throwError.func(d, `failed to unban user: ${e}`));
};