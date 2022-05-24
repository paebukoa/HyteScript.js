module.exports = async d => {
    let [property = "id", userId = d.author?.id] = d.func.params.splits;

    const userData = d.client.users.cache.get(userId);

    if (property === "exists") return userData ? true : false;

    if (!userData) return d.throwError.invalid(d, "user ID", userId);

    return d.properties.user(userData, property)
}

