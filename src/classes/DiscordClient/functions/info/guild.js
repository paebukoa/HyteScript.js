const { getProperty } = require("../../utils/utils");

module.exports = async d => {
    let [property = "id", guildId = d.guild?.id] = d.function.parameters;

    const guildData = d.client.guilds.cache.get(guildId);

    if (property.toLowerCase() === "exists") return guildData? true : false;

    if (!guildData) return new d.error("invalid", d, "guild ID", guildId);

    return getProperty('guild', guildData, property)
}