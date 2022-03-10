module.exports = async d => {
    let [property = "id"] = d.params.splits;
    


    console.log(JSON.stringify(d.client.user));

    let acceptableData = {
        shard: d.client.shard,
        totalusercount: d.client.users.cache.size || 0,
        guildcount: d.client.guilds.cache.size || 0,
        totalchannelcount: d.client.channels.cache.size || 0,
        id: d.client.user.id,
        isbot: d.client.user.bot === true? "true" : "false",
        issystem: d.client.user.system === true? "true" : "false",
        flags: d.client.user.flags,
        name: d.client.user.username,
        discriminator: d.client.user.discriminator,
        avatarurl: d.client.user.avatarURL,
        createdtimestamp: d.client.user.createdTimestamp,
        defaultavatarurl: d.client.user.defaultAvatarURL,
        tag: d.client.user.tag,
        verified: d.client.user.verified,
        token: d.client.token
    };

    d.result = d.client[property.toLowerCase()];
    if (!d.result) d.result = d.client.user[property.toLowerCase()];

}