const { Client, IntentsBitField } = require("discord.js")
const { Database, commandTypes, Functions, replaceLast, getDirFiles, Events, error, Command, HscLog, Data } = require("./utils/utils");
const { compile } = require("../compiler");

class DiscordClient {
    /** Initialize a Discord Client in HyteScript.js using Discord.js.
     * 
     * Example:
     * ```js
     * const { DiscordClient } = require('hytescript.js')
     * 
     * const client = new DiscordClient({
     *     token: "your bot token",
     *     prefix: '!',
     *     intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
     * })
     * ```
     * 
     * Example importing a file with client options:
     * ```js
     * const { DiscordClient } = require('hytescript.js')
     * const config = require('./config.json')
     * 
     * const client = new DiscordClient(config)
     * ```
     * 
     * @param {{token: string, prefix: string, intents: string[] | number | string, debug?: boolean, respondBots?: boolean, logErrors?: boolean}} options Object with client options.
     * 
     * 
     */
    constructor (options) {

        /*     ++++++++       -::::::::       ::::
               ++++++++       =::::::::      :::::
               ++++++++       +=::::::::     :::: 
               ++++++++       ++-:::::::    ::::: 
               ++++++++       ++=:::::::    ::::  
               ++++++++       +++-:::::::  :::::  
               ++++++++++++++++++=:::::::  ::::   
               +++++++++++++++++++=::::::::::::   
               ++++++++++++++++++++-::::::::::    
               ++++++++++++++++++++=:::::::::     
               ++++++++       ++++++-::::::::     
               ++++++++       ++++++=:::::::      
               ++++++++       +++++++-::::::      
               ++++++++       =======-:::::       
               ++++++++       :::::::::::::       
               ++++++++       ::::::::::::        
               ++++++++       ::::::::::          */

        let {token, intents, prefix, debug = false, respondBots = false, logJSErrors = false} = options;

        // validating parameters
        if (typeof token !== 'string') return new error('client', `invalid TOKEN in <HIDEN>`)
        if (intents === 'all') return new error('client', `"all" intents is deprecated. Use intents array instead`)
        if (!Array.isArray(intents)) return new error('client', `invalid INTENTS in "${intents}"`)
        if (typeof prefix !== 'string' && !Array.isArray(prefix)) return new error('client', `invalid PREFIX in "${prefix}"`)

        // validating prefix
        const wrong = prefix?.find?.(x => typeof x !== 'string')

        if (typeof prefix === 'string') prefix = [prefix]
        else if (wrong != undefined) return new error('client', `prefixes must be string. Received ${typeof wrong} in "${wrong}"`)

        // validating intents
        const validIntents = Object.keys(IntentsBitField.Flags)
        const validatedIntents = []

        for (const intent of intents) {
            let foundIntent = validIntents.find(x => x.toLowerCase() === (typeof intent == 'string' ? intent.toLowerCase().replaceAll('_', '') : JSON.stringify(intent)))
            if (!foundIntent || !['string', 'number'].includes(typeof intent)) return new error('client', `invalid intent in "${intent}"`)
            
            validatedIntents.push(isNaN(foundIntent) ? IntentsBitField.Flags[foundIntent] : Number(foundIntent))
        }

        const client = new Client({
            intents: validatedIntents,
            partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
        });

        this.data = {
            clientOptions: {
                token, intents, respondBots, debug, logJSErrors,
                prefix: prefix.map(x => compile(x))
            },
            client,
            status: {},
            databases: {},
            internalDatabase: new Database('internal', 'internal'),
            commandManager: commandTypes,
            functions: new Functions(),
            events: new Events(),
            commands: [],
            invite: 'https://discord.gg/bdUENGdN88',
            version: require("../../../package.json").version,
            error,
            data: new Data({
                message: {
                    content: '',
                    embeds: [],
                    components: [],
                    reply: undefined,
                    allowedMentions: {
                        parse: ['users', 'roles', 'everyone'],
                        repliedUser: true,
                    },
                    tts: false,
                    reset() {
                        this.content = ''
                        this.embeds = []
                        this.components = []
                        this.reply = undefined
                        this.allowedMentions = {
                            parse: ['users', 'roles', 'everyone'],
                            repliedUser: true
                        }
                        this.tts = false
                    }
                },
                logJSErrors
            })
        }

        this.data.events.get('ready')(this.data)

        client.login(token);

        setTimeout(() => {
            if (!client.isReady()) {
                HscLog.warn(`client took 15 seconds to initialize.\nIf you're using Repl.it to host your bot, try to turn off your bot, then execute \x1b[30;1mkill 1\x1b[0m in your shell. That problem commonly happens due to rate limits, because Repl.it haven't been made to host an entire Discord bot.\nIf you're using any other hosting service and that's happening, please, come to our support: \x1b[36;1m${this.data.invite}\x1b[0m`)
            }
        }, 15000);
    };

    /**
     * Adds commands to the client.
     * 
     * Example:
     * ```js
     * const { DiscordClient } = require('hytescript.js')
     * 
     * const client = new DiscordClient({
     *     token: "your bot token",
     *     prefix: '!',
     *     intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
     * })
     * 
     * client.addCommands({
     *     name: 'hello',
     *     code: `Hey, what's up?`
     * })
     * 
     * client.addEvents('messageCreate') // messageCreate event is needed to run default commands
     * ```
     * Running the command added: `!hello`
     * 
     * Bot will respond: "Hey, what's up?"
     * 
     * 
     * 
     * @param  {...{name?: string, code: string, aliases?: string[], type?: string, executeOnDM?: boolean, ignorePrefix?: boolean, enableComments?: boolean}} commands a command object
     */

    addCommands(...commands) {
        for (const command of commands) {
            command.path = '<main file>'
            this.data.commands.push(new Command(command, this.data.commandManager))
        }
        /*console.log('Loading main file commands...')

        let load = 0
        let plusAmount = (100 / commands.length).toFixed(2)

        for (const command of commands) {
            command.path = 'index.js'
            let parseData = utils.parseCommand(this.data, command)
            for (let row of parseData.table.__rows) {
                this.data.table.addRow(...row)
            }
            
            load = Math.round(load + plusAmount)
            console.log(load > 100 ? `\x1b[35m100%\x1b[0m` : `\x1b[35m${load}%\x1b[0m`)
        }*/
    }

    /**
     * 
     * @param {string} path the folder path
     */
    
    readFolder(path) {
        let files = getDirFiles(path)

        for (let file of files) {
            let commands = []
            let commandReq = require(file.path)
            if (Array.isArray(commandReq)) commands.push(...commandReq)
            else commands.push(commandReq)

            for (const command of commands) {
                command.path = file.path
                this.data.commands.push(new Command(command, this.data.commandManager))
            }
        };
    };

    addEvents(...events) {
        const wrongEvent = events.find(x => typeof x !== 'string')
        if (wrongEvent) return new error('client', `client#addEvents: events must be string. Received ${typeof wrongEvent} in "${wrongEvent}"`)
        for (const event of events) {
            if (event.toLowerCase() === 'ready') HscLog.warn(`'ready' event already have been preadded.`)
            else {
                let runEvent = this.data.events.get(event.toLowerCase());
                if (!runEvent) return new error('client', `invalid event in "${event}"`)
    
                runEvent(this.data);
            }
        }
    };

    setStatus(options) {
        let {text: name, type = 'PLAYING', status = 'online'} = options;
        this.data.status = {
            activities: [{
                name,
                type
            }],
            status
        };
    };

    addDatabase(name, entries, options = {}) {
        if (typeof name !== 'string') throw new TypeError(`name must be a string.`)
        if (typeof entries !== "object" || !JSON.stringify(entries).startsWith("{")) throw new TypeError(`entries must be an object.`)
        if (this.data.databases.hasOwnProperty(name)) throw new TypeError(`database with name "${name}" already exists.`)

        const newDb = new Database(name, "databases", entries, options)

        this.data.databases[name] = newDb;
    }

    addFunctions(...functions) {
        for (const func of functions) {
            const {name, description, usage, parameters, aliases, parseParams = true, code: run} = func
            this.data.functions.set(name.toLowerCase(), { description, usage, parameters, aliases, parseParams, run })
        }
    }
};

module.exports = DiscordClient;

