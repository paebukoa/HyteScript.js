module.exports = async d => {
    let [userId] = d.params.splits;
    const user = d.client.users.cache.get(userId);
    if (!user) {
        d.error.set.newError(d, 'function', `Invalid user ID "${userId}" provided.`);
        return;
    }
    console.log(user);
    d.result = user.avatarURL;
}