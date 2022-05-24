module.exports = async d => {
    let [index = '1', property = 'id'] = d.func.params.splits;

    if (isNaN(index) && Number(index) < 1) return d.throwError.invalid(d, 'element index', index);

    const mentions = [...d.message.mentions.users.values()];
    const userData = mentions[Number(index) - 1]; 

    if (!userData) return;

    return d.properties.user(user)
};