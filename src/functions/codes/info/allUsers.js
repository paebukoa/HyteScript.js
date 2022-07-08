module.exports = async d => {
    let [sep = ','] = d.function.parameters;

    let users = d.client.users.cache.keys()

    return [...users].join(sep)
};