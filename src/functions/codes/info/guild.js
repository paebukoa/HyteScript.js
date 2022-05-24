module.exports = async d => {
    let [property = "id", guildId = d.guild?.id] = d.func.params.splits;

    const guildData = d.client.guilds.cache.get(guildId);

    if (property.toLowerCase() === "exists") return guildData? true : false;

    if (!guildData) return d.throwError.invalid(d, "guild ID", guildId);

    return d.properties.guild(guildData, property)
}