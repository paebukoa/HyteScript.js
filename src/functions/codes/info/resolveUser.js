module.exports = async d => {
    let [userResolver, property = 'id'] = d.func.params.splits;
    
    let user = d.client.users.cache.find(user => [user.id, user.username.toLowerCase(), user.tag.toLowerCase(), user.toString()].includes(userResolver?.toLowerCase()))
    if (!user) return;

    return d.properties.user(user, property)
};