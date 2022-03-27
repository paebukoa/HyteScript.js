module.exports = async d => {
    let [property = "id", userId = d.author?.id] = d.func.params.splits;

    const userData = d.client.users.cache.get(userId);

    if (property === "exists") return userData ? true : false;

    if (!userData) return d.throwError.invalid(d, "user ID", userId);

    let acceptableData = {
        id: userData.id,
        isbot: userData.bot === true? "true" : "false",
        issystem: userData.system === true? "true" : "false",
        flags: userData.flags,
        name: userData.username,
        discriminator: userData.discriminator,
        avatarurl: userData.avatarURL,
        createdtimestamp: userData.createdTimestamp,
        defaultavatarurl: userData.defaultAvatarURL,
        tag: userData.tag
    };

    return acceptableData[property.toLowerCase()];
}