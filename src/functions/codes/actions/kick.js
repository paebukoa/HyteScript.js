module.exports = async d => {
    let [memberId = d.author?.id, guildId = d.guild?.id, reason] = d.func.params.splits;

    const guild = d.client.guilds.cache.get(guildId);
    if (!guild) return d.throwError.invalid(d, 'guild ID', guildId);

    const member = guild.members.cache.get(memberId);
    if (!member) return d.throwError.func(d, `the user with ID "${memberId}" is not in the guild or doesn't exists`);

    member.kick(reason).catch(e => d.throwError.func(d, `failed to kick user: ${e}`));
};