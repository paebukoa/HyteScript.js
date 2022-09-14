class Properties {
    static user(user, property) {
        const filteredProps = {
            id: user.id,
            isbot: user.bot,
            issystem: user.system,
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
            uptime: client.uptime,
            totalusercount: client.users?.cache.size || 0,
            guildcount: client.guilds?.cache.size || 0,
            totalchannelcount: client.channels?.cache.size || 0,
            id: client.user.id,
            isbot: client.user.bot,
            issystem: client.user.system,
            flags: client.user.flags?.join?.(","),
            name: client.user.username,
            discriminator: client.user.discriminator,
            avatar: `${client.user.avatarURL?.()}?size=4096`,
            createdtimestamp: client.user.createdTimestamp,
            defaultavatar: client.user.defaultAvatarURL,
            tag: client.user.tag,
            isverified: client.user.flags?.includes?.("VERIFIED_BOT") || false,
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
            parentid: channel.parentId ?? channel.guild.id,
            threadscount: channel.threads?.cache?.size || 0,
            isnsfw: channel,
            id: channel.id,
            name: channel.name,
            lastmessageid: channel.lastMessageId,
            createdtimestamp: channel.createdTimestamp,
            position: channel.position,
            recipient: channel.recipient?.id,
            isdeletable: channel.deletable,
            lastpintimestamp: channel.lastPinTimestamp,
            autoarchiveduration: channel.defaultAutoArchiveDuration,
            ismanageable: channel.manageable,
            memberscount: channel.members.size || 0,
            ispartial: channel.partial,
            hassyncedpermissions: channel.permissionsLocked,
            slowmodetime: channel.rateLimitPerUser,
            topic: channel.topic,
            url: channel.url,
            isviewable: channel.viewable,
            bitrate: channel.bitrate,
            isfull: channel.full,
            isjoinable: channel.joinable,
            rtcregion: channel.rtcRegion,
            isspeakable: channel.speakable,
            userlimit: channel.userLimit,
            islockedthread: channel.locked,
            archivetimestamp: channel.archiveTimestamp,
            
        };
    
        return filteredProps[property.toLowerCase()]
    }

    static message(message, property) {
        const filteredProps = {
            content: message.content,
            guildid: message.guildId,
            channelid: message.channelId,
            authorid: message.author?.id,
            ispinned: message.pinned,
            createdtimestamp: message.createdtimestamp,
            id: message.id,
            issystem: message.system,
            istts: message.tts,
            ispinnable: message.pinnable,
            hasthread: message.hasThread,
            cleancontent: message.cleanContent,
            url: message.url,
            type: message.type,
            attachmentscount: message.attachments.size || 0,
            iscrosspostable: message.crosspostable,
            isdeletable: message.deletable,
            iseditable: message.editable,
            editedtimestamp: message.editedTimestamp,
            flags: message.flags.toArray().join(','),
            ispartial: message.partial,
            stickerscount: message.stickers.size || 0,
            threadid: message.thread?.id,
            webhookid: message.webhookId
        }
    
        return filteredProps[property.toLowerCase()];
    }

    static role(role, property) {
        const filteredProps = {
            color: role.hexColor,
            createdtimestamp: role.createdTimestamp,
            guildid: role.guild.id,
            ishoist: role.hoist,
            icon: `${role.iconURL()}?size=4096`,
            id: role.id,
            ismanaged: role.managed,
            memberscount: role.members?.size || 0,
            ismentionable: role.mentionable,
            name: role.name,
            position: role.position,
            isboosterrole: role.tags.premiumSubscriberRole,
            permissions: role.permissions.toArray().join(','),
            iseditable: role.editable
        }
    
        return filteredProps[property.toLowerCase()];
    }

    static emoji(emoji, property) {
        const filteredProps = {
            isanimated: emoji.animated,
            authorid: emoji.author?.id,
            isavailable: emoji.available,
            createdtimestamp: emoji.createdTimestamp,
            isdeletable: emoji.deletable,
            guildid: emoji.guild?.id,
            ismanaged: emoji.managed,
            id: emoji.id,
            name: emoji.name,
            url: emoji.url,
            full: emoji.toString()
        }
    
        return filteredProps[property.toLowerCase()];
    }
    
    static guildMember(guildMember, property) {
        const filteredProps = {
            avatar: `${guildMember.displayAvatarURL()}?size=4096`,
            isbannable: guildMember.bannable,
            timeouttimestamp: guildMember.communicationDisabledUntilTimestamp,
            displaycolor: guildMember.displayHexColor,
            nickname: guildMember.displayName,
            dm: guildMember.dmChannel,
            id: guildMember.id,
            joinedtimestamp: guildMember.joinedTimestamp,
            iskickable: guildMember.kickable,
            ismanageable: guildMember.manageable,
            ismoderatable: guildMember.moderatable,
            ispartial: guildMember.partial,
            ispending: guildMember.pending,
            istimeouted: guildMember.isCommunicationDisabled(),
            guildid: guildMember.guild.id,
            boostingsince: guildMember.premiumSinceTimestamp,
            status: guildMember.presence?.status ?? "offline",
            activitiescount: guildMember.presence?.activities?.length || 0,
            highestroleid: guildMember.roles.highest?.id,
            hoistingroleid: guildMember.roles.hoist?.id,
            colorroleid: guildMember.roles.color?.id,
            isboosting: guildMember.roles.premiumSubscriberRole != undefined,
            iconroleid: guildMember.roles.icon?.id,
            rolescount: guildMember.roles.cache.size || 0,
            isdeafened: guildMember.voice?.deaf,
            ismuted: guildMember.voice?.mute,
            isselfdeafen: guildMember.voice?.selfDeaf,
            isselfmute: guildMember.voice?.selfMute,
            isserverdeafen: guildMember.voice?.serverDeaf,
            isservermute: guildMember.voice?.serverMute,
            voicesessionid: guildMember.voice?.sessionId,
            isstagevoicesuppressed: guildMember.voice?.suppress,
            isstreaming: guildMember.voice?.streaming,
            isselfvideo: guildMember.voice?.selfVideo,
            stagevoicerequesttospeaktimestamp: guildMember.voice?.requestToSpeakTimestamp,
            device: 
                guildMember.presence?.clientStatus?.desktop != undefined ? "desktop" :
                guildMember.presence?.clientStatus?.web != undefined ? "web" :
                guildMember.presence?.clientStatus?.mobile != undefined ? "mobile" : undefined,
            permissions: guildMember.permissions.toArray().join(',')
        }

        return filteredProps[property.toLowerCase()];
    }
}

module.exports = Properties