module.exports = async d => {
    let [property] = d.params.splits;
    
    let acceptableData = {
        id: d.author?.id,
        isbot: d.author?.bot === true? "true" : "false",
        issystem: d.author?.system === true? "true" : "false",
        flags: d.author?.flags,
        name: d.author?.username,
        discriminator: d.author?.discriminator,
        avatarurl: d.author?.avatarURL,
        createdtimestamp: d.author?.createdTimestamp,
        defaultavatarurl: d.author?.defaultAvatarURL,
        tag: d.author?.tag
    };

    d.result = acceptableData[property.toLowerCase()];
};