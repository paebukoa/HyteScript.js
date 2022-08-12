module.exports = async d => {
    let [property = "id", userId = d.author?.id] = d.function.parameters;

    const userData = d.client.users.cache.get(userId);

    if (property === "exists") return userData ? true : false;

    if (!userData) return new d.error("invalid", d, "user ID", userId);

    return d.properties.user(userData, property)
}
