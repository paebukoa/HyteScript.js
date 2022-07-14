const djs = require("discord.js")
const eventReader = require("./../events/eventReader.js")
const conditionParser = require("./conditionParser.js")
const throwError = require("./error.js")
const utils = require('./utils')
const commandTypes = require('./commandTypes')
const Database = require("./database.js")
const InternalDatabase = require("./internalDatabase.js")
const { loadedFunctions } = require("../functions/functionLoader.js")
const AsciiTable = require('ascii-table')
const axios = require('axios')
const Compiler = require("./compiler.js")

class Client {
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
     * @param {{token: string, prefix: string, intents: string[] | number | string, debug?: boolean, respondBots?: boolean, logErrors?: boolean}} data Object with client options.
     * 
     * 
     */
    constructor (data) {

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

        let {token, intents = "all", prefix, debug = false, respondBots = false, logErrors = false} = data; 

        const allIntents = Object.keys(djs.Intents.FLAGS);

        if (intents === "all") intents = allIntents;
        
        const client = new djs.Client({
            intents,
            partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
        });

        client.once("ready", async () => {
            console.log(_this.data.table.toString())

            client.user.setPresence(this.data.status);

            let version = require("./../../package.json").version;
        
            // contacting API

            console.log('\x1b[36mGetting contact with API...\x1b[0m')

            let res = await axios.get("https://paebukoaapi.paebukoa.repl.co");
            
            if (res.status !== 200 || typeof res.data !== 'object') {
                console.log('\u001b[31mFailed to contact API!\x1b[0m')
                res.data = {
                    hytera: {invite: `https://discord.gg/wx9kMjgcur`},
                    hytescript: {version, ownerMessage: ''}
                }
            } else {
                console.log('\u001b[32mSuccessfully contacted API!\x1b[0m')
            } 
    
            let invite = res.data.hytera.invite
            let latestVersion = res.data.hytescript.version
            let ownerMessage = res.data.hytescript.ownerMessage

            _this.data.invite = invite

            console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[34mINFO\x1b[0m | \x1b[35;1m${loadedFunctions.size || 0} functions \x1b[0mloaded.`);
            // if (version !== latestVersion) console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[33mWARN\x1b[0m | \x1b[31mYOU'RE NOT USING THE LATEST VERSION OF HYTESCRIPT (v${latestVersion})!\x1b[0m`)
            console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[33mWARN\x1b[0m | \x1b[31mYou're using a dev version, which means that it can contains serious bugs and stability problems.\nPlease, use v${latestVersion} if you're looking for a stable version.\x1b[0m`)
            console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[34mINFO\x1b[0m | \x1b[0mClient Initialized on \x1b[36;1mv${version}\x1b[0m.`);
            if (typeof ownerMessage === 'string' && ownerMessage !== '') console.log(`\x1b[32mHYTE\x1b[32;1mSCRIPT\x1b[0m \x1b[34mINFO\x1b[0m | \x1b[36m"${ownerMessage}"\x1b[0m - ${client.users.cache.get("757006394531512390").username}`)
            console.log(`HyTera Development - \x1b[34;1m${invite}\x1b[0m`);

            this.data.commandManager.ready.forEach(commandData => {
                
                let data = {};
        
                for (const key in this.data) {
                    if (Object.hasOwnProperty.call(this.data, key)) {
                        const element = this.data[key];
                        
                        data[key] = element;
                    }
                }

                data.command = commandData
                data.eventType = 'ready'
                data.error = false
                data.data = this.data.getData()

                commandData.code.parse(data)
                
            })
        });

        this.data = {
            clientOptions: {
                token, prefix, intents, respondBots, debug, logErrors
            },
            client, throwError, utils,
            status: {},
            databases: {},
            commandManager: commandTypes,
            functions: loadedFunctions,
            conditionParser: new conditionParser(),
            internalDb: new InternalDatabase()
        }

        this.data.table = new AsciiTable('COMMANDS')
        this.data.table.setHeading('name', 'type', 'status', 'problems')
                       .setAlign(1, AsciiTable.CENTER)
                       .setAlign(2, AsciiTable.CENTER)
                       .setAlign(3, AsciiTable.RIGHT)
                       .setBorder('|', '=', '.', "'")

        this.data.clientOptions.prefix = Array.isArray(this.data.clientOptions.prefix) ?
            this.data.clientOptions.prefix.map(x => Compiler.compile(x))
            : Compiler.compile(this.data.clientOptions.prefix)

        this.data.getData = () => {
            return {
                vars: new Map(),
                arrays: { default: [] },
                objects: { default: new Map() },
                message: {
                    components: [],
                    embeds: [],
                    messageToReply: undefined,
                    allowedMentions: {
                        parse: ['roles', 'users', 'everyone']
                    },
                    reset() {
                        this.components = []
                        this.embeds = []
                        this.messageToReply = undefined
                        this.allowedMentions = {
                            parse: ['roles', 'users', 'everyone']
                        }
                    }
                },
                error: {},
                callbacks: utils.duplicate(this.data.commandManager.callback),
                placeholders: []
            }
        }

        let _this = this

        client.login(token);

        setTimeout(() => {
            if (!client.isReady()) {
                console.log(`Client took 15 seconds and didn't initialized yet.\nIf you need help with that, please come to our support: \x1b[34;1m${this.data.invite}\x1b[0m`)
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
        console.log('Loading main file commands...')

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
        }
    }

    /**
     * 
     * @param {string} path the folder path
     */
    
    readFolder(path) {
        console.log(`Loading "${path.replaceAll('/', '\\')}" commands...`)
        
        let files = utils.getDirFiles(path)
        
        let load = 0
        let plusAmount = Number((100 / files.length).toFixed(2))

        for (let file of files) {
            let commands = []
            let commandReq = require(file.path)
            if (Array.isArray(commandReq)) commands.push(...commandReq)
            else commands.push(commandReq)

            for (let command of commands) {
                command.path = file.path.replaceAll('/', '\\')
                let parseData = utils.parseCommand(this.data, command, file.name)
                for (let row of parseData.table.__rows) {
                    this.data.table.addRow(...row)
                }
            }

            load = Math.round(load + plusAmount)
            console.log(load > 100 ? `\x1b[35m100%\x1b[0m` : `\x1b[35m${load}%\x1b[0m`)
        };
    };

    addEvents(...events) {
        for (const event of events) {
            let runEvent = eventReader.loadedEvents.get(event.toLowerCase());
            if (!runEvent) return;

            runEvent(this.data);
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

        const newDb = new Database(name, entries, options)

        this.data.databases[name] = newDb;
    }

    addFunctions(...functions) {
        for (const func of functions) {
            const {name, code: run} = func

            this.data.loadedFunctions.set(name.toLowerCase(), { run })
        }
    }
};

module.exports = Client;