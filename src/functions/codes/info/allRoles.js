module.exports = async d => {
    let [sep = ','] = d.func.params.splits;

    let roles = d.client.roles.cache.keys()

    return [...roles].join(sep)
};