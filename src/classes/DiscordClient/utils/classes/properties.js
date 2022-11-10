class Properties {
    static user(user, property) {
        const filteredProps = {
            id: user.id,
            isbot: user.bot,
            issystem: user.system,
            name: user.username,
            discriminator: user.discriminator,
            avatar: user.avatarURL?.(),
            displayavatar: user.displayAvatarURL?.(),
            banner: user.bannerURL?.(),
            createdtimestamp: user.createdTimestamp,
            defaultavatar: user.defaultAvatarURL,
            tag: user.tag,
            dmchannelid: user.dmChannel?.id,
            hexbannercolor: user.hexAccentColor,
            ispartial: user.partial
        };

        return filteredProps[property.toLowerCase()]
    }

    static client(client, property) {
        const filteredProps = {
            totalchannelscount: client.channels?.cache?.size || 0,
            totalemojiscount: client.emojis?.cache?.size || 0,
            guildscount: client.guilds?.cache?.size || 0,
            token: client.token,
            uptime: client.uptime,
            totaluserscount: client.users?.cache?.size || 0,
            id: client.user?.id
        }

        return filteredProps[property.toLowerCase()]
    }

    static guild(guild, property) {
        const filteredProps = {
            afkchannelid: guild.afkChannelId,
            afktimeout: guild.afkTimeout,
            isavailable: guild.available,
            banscount: guild.bans?.cache?.size || 0,
            channelscount: guild.channels?.cache?.size || 0,
            createdtimestamp: guild.createdTimestamp,
            defaultmessagenotifications: guild.defaultMessageNotifications,
            description: guild.description,
            emojiscount: guild.emojis?.cache?.size || 0,
            explicitcontentfilter: guild.explicitContentFilter,
            id: guild.id,
            invitescount: guild.invites?.cache?.size || 0,
            joinedtimestamp: guild.joinedTimestamp,
            islarge: guild.large,
            maxbitrate: guild.maximumBitrate,
            maxmembers: guild.maximumMembers,
            totalmemberscount: guild.members?.cache?.size || 0,
            usermemberscount: guild.members?.cache?.filter?.(x => !x.bot)?.size || 0,
            botmemberscount: guild.members?.cache?.filter?.(x => x.bot)?.size || 0,
            mfalevel: guild.mfaLevel,
            name: guild.name,
            nameacronym: guild.nameAcronym,
            nsfwlevel: guild.nsfwLevel,
            ownerid: guild.ownerId,
            ispartnered: guild.partnered,
            preferredlocale: guild.preferredLocale,
            isboostsprogressbarenabled: guild.premiumProgressBarEnabled,
            boostscount: guild.premiumSubscriptionCount,
            premiumtier: guild.premiumTier,
            moderatorupdateschannelid: guild.publicUpdatesChannelId,
            rolescount: guild.roles?.cache?.size || 0,
            ruleschannelid: guild.rulesChannelId,
            eventscount: guild.scheduledEvents?.cache?.size || 0,
            shardid: guild.shardId,
            stageinstancescount: guild.stageInstances?.cache?.size || 0,
            stickerscount: guild.stickers?.cache?.size || 0,
            systemchannelid: guild.systemChannelId,
            vanityinvitecode: guild.vanityURLCode,
            vanityinviteuses: guild.vanityURLUses,
            verificationlevel: guild.verificationLevel,
            isverified: guild.verified,
            widgetchannelid: guild.widgetChannelId,
            iswidgetenabled: guild.widgetEnabled,
            banner: guild.bannerURL?.(),
            icon: guild.iconURL?.(),
            inviteimage: guild.splashURL?.(),
            boosterroleid: guild.roles?.premiumSubscriberRole?.id,
            everyoneroleid: guild.roles?.everyone?.id,
            highestroleid: guild.roles?.highest?.id
        };

        return filteredProps[property.toLowerCase()]
    }

    static channel(channel, property) {
        const filteredProps = {
            type: channel.type,
            guildid: channel.guildId,
            parentid: channel.parentId ?? channel.guild?.id,
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
            autoarchiveduration: channel.autoArchiveDuration,
            ismanageable: channel.manageable,
            memberscount: channel.members?.size || 0,
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
            clientjoined: channel.joined,
            ownerid: channel.ownerId,
            issendable: channel.sendable,
            isunarchivable: channel.unarchivable,
            stageinstanceid: channel.stageInstance?.id,
            stageinstanceeventid: channel.stageInstance?.guildScheduledEventId
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
            icon: role.iconURL(),
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
            avatar: guildMember.displayAvatarURL(),
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
            guildid: guildMember.guild?.id,
            boostingsince: guildMember.premiumSinceTimestamp,
            status: guildMember.presence?.status ?? "offline",
            activitiescount: guildMember.presence?.activities?.length || 0,
            highestroleid: guildMember.roles?.highest?.id,
            hoistingroleid: guildMember.roles?.hoist?.id,
            colorroleid: guildMember.roles?.color?.id,
            isboosting: guildMember.roles?.premiumSubscriberRole != undefined,
            iconroleid: guildMember.roles?.icon?.id,
            rolescount: guildMember.roles?.cache.size || 0,
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
    
    static reaction(reaction, property) {
        const filteredProps = {
            count: reaction.count,
            ispartial: reaction.partial,
            clientreacted: reaction.me,
            emoji: reaction.emoji.toString(),
            messageid: reaction.message.id,
            usersids: Object.keys(reaction.users.cache).join(',')
        }

        return filteredProps[property.toLowerCase()];
    }

    static scheduledEvent(event, property) {
        const filteredProps = {
            channelid: event.channelId,
            createdtimestamp: event.createdTimestamp,
            creatorid: event.creatorId,
            description: event.description,
            entityid: event.entityId,
            entitytype: 
                event.entityType === 1 ? 
                'stageInstance' 
                : event.entityType === 2 ?
                'voice'
                : event.entityType === 3 ?
                'external' : undefined,
            guildid: event.guildId,
            id: event.id,
            name: event.name,
            starttimestamp: event.scheduledStartTimestamp,
            endtimestamp: event.scheduledEndTimestamp,
            userscount: event.usersCount,
            url: event.url,
            coverimage: event.coverImageURL(),
            isactive: event.isActive(),
            iscanceled: event.isCanceled(),
            iscompleted: event.isCompleted(),
            isscheduled: event.isScheduled()
        }

        return filteredProps[property.toLowerCase()];
    }

    static messageEmbed(message, property, index) {
        const filteredProps = {
            title: message.embeds?.[index]?.title,
            description: message.embeds?.[index]?.description,
            description: message.embeds?.[index]?.description,
            authorname: message.embeds?.[index]?.author?.name,
            authorurl: message.embeds?.[index]?.author?.url,
            authoriconurl: message.embeds?.[index]?.author?.iconURL,
            color: message.embeds?.[index]?.hexColor,
            image: message.embeds?.[index]?.image?.url,
            footertext: message.embeds?.[index]?.footer?.text,
            footericonurl: message.embeds?.[index]?.footer?.iconURL,
            timestamp: message.embeds?.[index]?.timestamp,
            url: message.embeds?.[index]?.url,
            video: message.embeds?.[index]?.video?.url
        }

        return filteredProps[property.toLowerCase()]
    }
}

module.exports = Properties