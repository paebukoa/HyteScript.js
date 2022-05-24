module.exports = async d => {
    let [sep = ','] = d.func.params.splits;

    let users = d.client.users.cache.keys()

    return [...users].join(sep)
};