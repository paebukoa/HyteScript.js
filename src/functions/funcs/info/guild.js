module.exports = async d => {
    let [property, guildId = d.guild?.id] = d.params.splits;

    const guildData = d.client.guilds.cache.get(guildId);

    if (property === "exists") {
        d.result = guildData?true:false;
        return;
    };

    if (!guildData) return d.error.invalidError(d, "guild ID", guildId);

    let acceptableData = {
        name: guildData.name,
        id: guildData.id,
        channelcount: guildData.channels.cache.size || 0,
        botcount: guildData.members.cache.filter(member => member.user.bot).size || 0,
        membercount: guildData.members.cache.size || 0,
        bancount: guildData.bans.cache.size || 0,
        rolecount: guildData.roles.cache.size || 0,
        icon: guildData.iconURL,
        commandcount: guildData.commands.cache.size || 0,
        shardid: guildData.shardId,
        nameacronym: guildData.nameAcronym,
        maxmembers: guildData.maximumMembers,
        locale: guildData.preferredLocale,
        ownerid: guildData.ownerid,
        createdtimestamp: guildData.createdTimestamp,
        emojicount: guildData.emojis.cache.size || 0,
        sitckercount: guildData.stickers.cache.size || 0,
        banner: guildData.bannerURL,
        boostlevel: guildData.premiumTier,
        invitecount: guildData.invites.cache.size || 0,
        eventcount: guildData.scheduledEvents.cache.size || 0,
        ruleschannelid: guildData.rulesChannelId,
        verificationlevel: guildData.verificationLevel,
        description: guildData.description,
        stageinstancecount: guildData.stageInstances.cache.size || 0,
        features: guildData.features.join(",")
    };

    d.result = acceptableData[property];
}