module.exports = async d => {
    let [property, userId = d.author?.id] = d.params.splits;

    const userData = d.client.users.cache.get(userId);

    if (property === "exists") {
        d.result = userData?true:false;
        return;
    };

    if (!userData) return d.error.invalidError(d, "user ID", userId);

    if (Array.isArray((userData[property]))) {
        d.result = userData[property].flat(Infinity).join(",");
        return;
    }

    d.result = userData[property];
}