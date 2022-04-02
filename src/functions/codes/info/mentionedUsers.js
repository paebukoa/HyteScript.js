module.exports = async d => {
    let [index = '1', property = 'id'] = d.func.params.splits;

    if (isNaN(index) && Number(index) < 1) return d.throwError.invalid(d, 'element index', index);

    const mentions = [...d.message.mentions.users.values()];
    const userData = mentions[Number(index) - 1]; 

    if (!userData) return;

    let acceptableData = {
        id: userData.id,
        isbot: userData.bot === true? "true" : "false",
        issystem: userData.system === true? "true" : "false",
        name: userData.username,
        discriminator: userData.discriminator,
        avatarurl: userData.avatarURL,
        createdtimestamp: userData.createdTimestamp,
        defaultavatarurl: userData.defaultAvatarURL,
        tag: userData.tag
    };
    
    return acceptableData[property.toLowerCase()];
};