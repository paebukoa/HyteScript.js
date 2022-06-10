class Properties {
    static user(user, property) {
        const filteredProps = {
            id: user.id,
            isbot: user.bot === true? "true" : "false",
            issystem: user.system === true? "true" : "false",
            name: user.username,
            discriminator: user.discriminator,
            avatar: `${user.avatarURL?.()}?size=4096`,
            createdtimestamp: user.createdTimestamp,
            defaultavatar: user.defaultAvatarURL,
            tag: user.tag
    };

        return filteredProps[property.toLowerCase()]
    }

    static client(client, property) {
        const filteredProps = {
            shard: client.shard,
            totalusercount: client.users?.cache.size || 0,
            guildcount: client.guilds?.cache.size || 0,
            totalchannelcount: client.channels?.cache.size || 0,
            id: client.user.id,
            isbot: client.user.bot === true? "true" : "false",
            issystem: client.user.system === true? "true" : "false",
            flags: client.user.flags?.join?.(","),
            name: client.user.username,
            discriminator: client.user.discriminator,
            avatar: `${client.user.avatarURL?.()}?size=4096`,
            createdtimestamp: client.user.createdTimestamp,
            defaultavatar: client.user.defaultAvatarURL,
            tag: client.user.tag,
            isVerified: client.user.flags?.includes?.("VERIFIED_BOT") || false,
            token: client.token
        }

        return filteredProps[property.toLowerCase()]
    }

    static guild(guild, property) {
        const filteredProps = {
            name: guild.name,
            id: guild.id,
            channelcount: guild.channels?.cache.size || 0,
            botcount: guild.members?.cache.filter(member => member.user.bot).size || 0,
            membercount: guild.members?.cache.size || 0,
            bancount: guild.bans?.cache.size || 0,
            rolecount: guild.roles?.cache.size || 0,
            icon: guild.iconURL,
            commandcount: guild.commands?.cache.size || 0,
            shardid: guild.shardId,
            nameacronym: guild.nameAcronym,
            maxmembers: guild.maximumMembers,
            locale: guild.preferredLocale,
            ownerid: guild.ownerId,
            createdtimestamp: guild.createdTimestamp,
            emojicount: guild.emojis?.cache.size || 0,
            stickercount: guild.stickers?.cache.size || 0,
            banner: guild.bannerURL,
            boostlevel: guild.premiumTier,
            invitecount: guild.invites.cache?.size || 0,
            eventcount: guild.scheduledEvents?.cache.size || 0,
            ruleschannelid: guild.rulesChannelId,
            verificationlevel: guild.verificationLevel,
            description: guild.description,
            stageinstancecount: guild.stageInstances?.cache.size || 0,
            features: guild.features.join(",")
        };

        return filteredProps[property.toLowerCase()]
    }

    static channel(channel, property) {
        const filteredProps = {
            type: channel.type,
            guildid: channel.guildId,
            parentid: channel.parentId,
            threadcount: channel.threads?.cache.size || 0,
            isnsfw: channel === true? "true" : "false",
            id: channel.id,
            name: channel.name,
            lastmessageid: channel.lastMessageId,
            createdtimestamp: channel.createdTimestamp,
            position: channel.rawPosition,
            recipient: channel.recipient?.id
        };
    
        return filteredProps[property.toLowerCase()]
    }

    static message(message, property) {
        const filteredProps = {
            content: message?.content,
            guildid: message?.guild?.id,
            channelid: message?.channel?.id,
            authorid: message?.author?.id,
            ispinned: message?.pinned ? 'true' : 'false',
            createdtimestamp: message?.createdtimestamp,
            id: message?.id,
            issystem: message?.system ? 'true' : 'false',
            istts: message?.tts ? 'true' : 'false',
            ispinnable: message?.pinnable ? 'true' : 'false',
            hasthreads: message?.hasThreads ? 'true' : 'false',
            cleancontent: message?.cleanContent,
            url: message?.url,
            type: message?.type
        }
    
        return filteredProps[property.toLowerCase()];
    }

    static role(role, property) {
        const filteredProps = {
            color: role.hexColor,
            createdtimestamp: role.createdTimestamp,
            guildId: role.guild.id,
            isHoist: role.hoist,
            icon: role.icon,
            id: role.id,
            isManaged: role.managed,
            membersCount: role.members?.size || 0,
            isMentionable: role.mentionable,
            name: role.name,
            position: role.position
        }
    
        return filteredProps[property.toLowerCase()];
    }
}

module.exports = Properties